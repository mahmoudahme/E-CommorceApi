import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
    name : {
        type : String ,
        required : [true ,"Brand Required" ] ,
        unique : [true , "Brand is unique"] ,
        minlength : [3 , "too short Brand name "] ,
        maxlength : [32 , "too long Brand name "]

    } ,
    slug:{
        type : String ,
        lowercase : true 
    } ,
    image : String ,
    

} , {timestamps :true}) ;

export default mongoose.model("Brand" , brandSchema) ;

