import ProductModel from "../models/ProductModel.js";
import slugify from "slugify";
import { ApiError } from "../Utils/apiError.js";
import { LoggerService } from "../services/logger.js";
const logger = new LoggerService("productController");

//////////////////////////////////////// CREATE PRODUCT ///////////////////////////////////////////////////
export const createProduct = async(req, res , next)=>{
    try {
        req.body.slug = slugify(req.body.title);
        const product = await ProductModel.create(req.body); 
        logger.info("PRODUCT CREATED ! " , product)
        res.status(201).json({ Data: product });
    } catch (error) {
        logger.error("THIS IS ERROR " , [error])
        return next(new ApiError(`System Error ${error}` , 404)) ;
    }
}
//////////////////////////////////////// GET ALL PRODUCTS ///////////////////////////////////////////////////
export const getAllProducts = async(req, res , next)=>{
    try {
        const Products = await ProductModel.find().populate({path :"category" , select : "name-_id"}).populate({path :"brand" , select : "name-_id"}) ;
        logger.info("GET ALL PRODUCTS " , Products)
        res.status(201).json({ Data: Products });
    } catch (error) {
        logger.error("THIS IS ERROR " , [error])
        return next(new ApiError(`System Error ${error}` , 404)) ;
    }
}
//////////////////////////////////////// GET PRODUCT BY ID ///////////////////////////////////////////////////
export const getProductByID = async(req , res , next)=>{
    try {
        const id = req.params.id  ;
        const product = await ProductModel.findById(id).populate({path :"category" , select : "name-_id"}).populate({path :"brand" , select : "name-_id"}) ;
        if(!product){
            logger.error(`product isn't found by id : ${id}`)
            return next(new ApiError(`product isn't found by id : ${id}` , 404))
        }
        logger.info("GET PRODUCT BY ID" , product)
        res.json({Data: product}).status(201) ;
    } catch (error) {
        logger.error("THIS IS ERROR " , [error])
        return next(new ApiError(`System Error ${error}` , 404)) ;
    }
}
//////////////////////////////////////// UPDATE PRODUCT ///////////////////////////////////////////////////
export const updateProduct = async(req, res , next)=>{
    try {
        const id = req.params.id  ;
        if(req.body.title){
            req.body.slug = slugify(req.body.title);
        }
        const product = await ProductModel.findByIdAndUpdate(
            {_id : id},
            req.body,
            {new : true}
        );
        if(!product){
            logger.error(`product isn't found by id : ${id}`)
            return next(new ApiError(`product isn't found by id : ${id}` , 404))
        }
        logger.info("PRODUCT UPDATED"  ,product)
        res.json({Data: product}).status(204) ;
    } catch (error) {
        logger.error("THIS IS ERROR " , [error])
        return next(new ApiError(`System Error ${error}` , 404)) ;
    }
}
//////////////////////////////////////// DELETE PRODUCT ///////////////////////////////////////////////////
export const deleteProduct = async(req, res , next)=>{
    try {
        const id = req.params.id  ;
        const product = await ProductModel.findByIdAndDelete(id) ;
        if(!product){
            logger.error(`product isn't found by id : ${id}`)
            return next(new ApiError(`product isn't found by id : ${id}` , 404))
        }
        logger.info("PRODUCT DELETED")
        res.json({message : "delete is success"}).status(201) ;
    } catch (error) {
        logger.error("THIS IS ERROR " , [error])
        return next(new ApiError(`System Error ${error}` , 404)) ;
    }
}