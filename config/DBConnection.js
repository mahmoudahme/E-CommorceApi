import mongoose from "mongoose";

export const connection = ()=>{
    mongoose.connect(process.env.DB_URI).then((conn) => {
        console.log(`Database Connected: ${conn.connection.host}`);
    })
};