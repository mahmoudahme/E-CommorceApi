import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'User must be belong to System'],
    },
    productId : {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: [true, 'Product must be belong to System'],
    }
});
const orderModel = mongoose.model("Order" , orderSchema) 
export default orderModel ;