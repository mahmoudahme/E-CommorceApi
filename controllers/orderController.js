import slugify from "slugify";
import { ApiError } from "../Utils/apiError.js";
import { verifyToken } from "../Utils/verifyToken.js";
import orderModel from "../models/Order.js";
import { LoggerService } from "../services/logger.js";
const logger  = new LoggerService("orderController") ;
////////////////////////////////////////MAKE ORDER /////////////////////////////////////////////////////////////
export const makeOrder = async(req , res , next )=>{
    try {
        const ProductId = req.params.id ; 
        verifyToken(req, res , async () => {
            if (req.user.id) {
              const order = await orderModel.create({
                userId :req.user.id  ,
                productId : ProductId 
              })
              logger.info("MAKE ORDER " , order)
              res.status(200).json({message : "Order Created" ,Data : order})
            } else {
              return next(new ApiError("You are not authenticated!" , 401)) ;
            }
        })
    } catch (error) {
        logger.error("THIS IS ERROR " , [error])
        return next(new ApiError(`System Error ${error}`) , 404)
    }
}
    ////////////////////////////////////////GET ALL ORDERS FOR ADMIN /////////////////////////////////////////////
    export const getAllOrdersForAdmin = async(req , res , next )=>{
    try {
        const order = await orderModel.find()
        .populate({path :"productId" , select : "title description price -_id"})
        .populate({path : "userId" , select : "firstName lastName email -_id"});
        logger.info("GET ALL ORDERS FOR ADMIN " , order)
        res.status(200).json({Data : order})
    } catch (error) {
        logger.error("THIS IS ERROR " , [error])
        return next(new ApiError(`System Error ${error}`) , 404)
    }
    
}
////////////////////////////////////////GET ALL ORDERS FOR USER///////////////////////////////////////////////
export const getAllOrdersForUser = async(req , res , next )=>{
    try {
        verifyToken(req, res , async () => {
            if (req.user.id) {
              const order = await orderModel.find({userId : req.user.id})
              .populate({path :"productId" , select : "title description price -_id"})
              .populate({path : "userId" , select : "firstName lastName email -_id"})
              logger.info("GET ALL ORDERS FOR USERS " , order)
              res.status(200).json({Data : order})
            } else {
              return next(new ApiError("You are not authenticated!" , 401)) ;
            }
        })
    } catch (error) {
        logger.error("THIS IS ERROR " , [error])
        return next(new ApiError(`System Error ${error}`) , 404)
    }
    
}
////////////////////////////////////////GET ORDER ORDER BY ID //////////////////////////////
export const getOrderById = async(req , res , next )=>{
    try {
        verifyToken(req, res , async () => {
            if (req.user.id) {
              const order = await orderModel.find({userId : req.user.id , _id : req.params.id})
              .populate({path :"productId" , select : "title description price -_id"})
              .populate({path : "userId" , select : "firstName lastName email -_id"})
              logger.info("GET ORDER BY ID" , order)
              res.status(200).json({Data : order})
            } else {
              return next(new ApiError("You are not authenticated!" , 401)) ;
            }
        })
    } catch (error) {
        logger.error("THIS IS ERROR " , [error])
        return next(new ApiError(`System Error ${error}`) , 404)
    }
}
////////////////////////////////////////Delete ORDER ///////////////////////////////////////////////////////////
export const deleteOrder = async(req , res , next )=>{
    try {
        const OrderId = req.params.id ;
            await orderModel.findByIdAndDelete(OrderId)
            logger.error("ORDER DELETED")
            res.status(200).json({message : "Order DELETED"})
        }
    catch (error) {
        logger.error("THIS IS ERROR " , [error])
        return next(new ApiError(`System Error ${error}`) , 404)
    }
}