import slugify from "slugify"
import CategoryModel from "../models/CategoryModel.js";
import { ApiError } from "../Utils/apiError.js";
import { LoggerService } from "../services/logger.js";
const logger = new LoggerService("categoryController")
///////////////////////////////////////CREATE CATRGORY //////////////////////////////////////////
export const createCategort = async(req, res , next)=>{
    try{
        const name = req.body.name ;
        const Categort = await CategoryModel.create({name , slug : slugify(name)}) ;
        logger.info("CATEGORY CREATED ! " , Categort)
        res.status(201).json({message : "Categort is Created !" , Data : Categort} )
    }catch(error){
        logger.error("This is error" , [error])
        return next(new ApiError(`System Error ${error}` , 404)) ;
    }
};
/////////////////////////////////////// GET ALL CategorS /////////////////////////////////////////////////////
export const getAllCategorts = async(req ,res , next )=>{
    try {
        const Categorts = await CategoryModel.find() ;
        logger.info("ALL CATEGORIES ! " , Categorts)
        res.status(200).json({Data : Categorts}) ;
    } catch (error) {
        logger.error("This is error" , [error])
        return next(new ApiError(`System Error ${error}` , 404)) ;
    }
};
/////////////////////////////////////// GET Categort BY ID /////////////////////////////////////////////////////
export const getCategortById = async(req ,res , next)=>{
    try{
        const id = req.params.id  ;
        const Categort = await CategoryModel.findById(id) ;
        if(!Categort){
            logger.error("Category isn't found by id")
            return next(new ApiError(`Categort isn't found by id : ${id}` , 404))
            // res.status(404).json({message : `category isn't found by id : ${id}`})
        }
        logger.info("Category ! >>>>> " , Categort)
        res.json({data: Categort}).status(201) ;
    }catch(error){
        logger.error("This is error" , [error])
        return next(new ApiError(`System Error ${error}` , 404)) ;
    }
};
/////////////////////////////////////// UPDATA Categort /////////////////////////////////////////////////////
export const updateCategort = async(req , res , next)=>{
    try {
        const id = req.params.id  ;
        const name = req.body.name ;
        const Categort = await CategoryModel.findByIdAndUpdate(
            {_id : id},
            {name , slug : slugify(name)},
            {new : true}
        );
        if(!Categort){
            logger.error("Category isn't found by id")
            return next(new ApiError(`Categort isn't found by id : ${id}` , 404))
        }
        logger.info("Category UPDATED " , Categort)
        res.json({data: Categort}).status(204) ;
    } catch (error) {
        logger.error("This is error" , [error])
        return next(new ApiError(`System Error ${error}` , 404)) ;
    }
};
/////////////////////////////////////// DELETE Categort /////////////////////////////////////////////////////
export const deleteCategort =async(req , res , next)=>{
    try {
        const id = req.params.id  ;
        const Categort = await CategoryModel.findByIdAndDelete(id) ;
        if(!Categort){
            logger.error("Brand isn't found by id")
            return next(new ApiError(`Categort isn't found by id : ${id}` , 404))
        }
        logger.info("CATEGORY DELETED")
        res.json({message : "delete is success"}).status(201) ;
    } catch (error) {
        logger.error("This is error" , [error])
        return next(new ApiError(`System Error ${error}` , 404)) ;
    }
};