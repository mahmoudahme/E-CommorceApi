import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'User must be belong to System'],
    },
    products : [{
        type: mongoose.Schema.ObjectId , ref: 'Product'
    }]
});
const cartModel = mongoose.model("Cart" , cartSchema) 
export default cartModel ;
    