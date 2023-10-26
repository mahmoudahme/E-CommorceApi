import express from "express"  ;
import ejs from "ejs" ;
import bodyParser from "body-parser";
import path from "path"
import configDotenv  from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors" ;
import swagger from "swagger-ui-express" ;
import { globalError } from "./middleWares/errorMiddelware.js";
import { connection } from "./config/DBConnection.js";
import authRouter from "./routers/authRoute.js";
import userRouter from "./routers/userRoute.js";
import brandRouter from "./routers/brandRoute.js";
import categoryRouter from "./routers/categoryRoute.js";
import productRouter from "./routers/productRoute.js";
import orderRouter from "./routers/orderRoute.js" ;
import cartRouter from "./routers/CartRoute.js" ;
// import swaggerDoc from "./swagger.json" ;
const app = express();
configDotenv.config({path : 'config/config.env'}); 
connection();

app.use(express.static("public"));
app.set('view engine' , 'ejs') ;
app.set('views' , 'views') ;
app.use(express.urlencoded({extended : true}));
app.use(express.json())
if(process.env.NODE_ENV == "development"){
    app.use(morgan("dev"))
    console.log("Mode : Development")
}
app.use(cors());
app.use(cookieParser())
app.use(express.json());


app.use("/api/v1/auth" , authRouter) ;
app.use("/api/v1/user" , userRouter) ;
app.use("/api/v1/brand" , brandRouter) ;
app.use("/api/v1/category" , categoryRouter) ;
app.use("/api/v1/product" , productRouter) ;
app.use("/api/v1/order" , orderRouter) ;
app.use("/api/v1/cart" , cartRouter)

//global error Middleware 
app.use(globalError);

const PORT = process.env.PORT || 5000
app.listen(PORT ,()=>{
    console.log(`server is running on the port ${PORT}`)
})

export default app ;