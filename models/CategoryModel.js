import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name : {
        type : String ,
        required : [true ,"Category Required" ] ,
        unique : [true , "category is unique"] ,
        minlength : [3 , "too short category name "] ,
        maxlength : [32 , "too long category name "]

    } ,
    slug:{
        type : String ,
        lowercase : true 
    } ,
    image : String ,
    

} , {timestamps :true}) ;

export  default mongoose.model("Category" , categorySchema) ;