import slugify from "slugify";
import BrandModel from "../models/BrandModel.js";
import { ApiError } from "../Utils/apiError.js";
import { LoggerService } from "../services/logger.js";
const logger = new LoggerService("brandController")
//////////////////////////////////////// CRAETE BRAND //////////////////////////////////////////////////////
export const createBrand = async(req, res , next)=>{
    try{
        const name = req.body.name ;
        const brand = await BrandModel.create({name , slug : slugify(name)}) ;
        logger.info("BRAND CREATED ! " , brand)
        res.status(201).json({message : "Brand is Created !" , Data : brand} )
    }catch(error){
        logger.error("This is error" , [error])
        return next(new ApiError(`System Error ${error}` , 404)) ;
    }
};
/////////////////////////////////////// GET ALL BRANDS /////////////////////////////////////////////////////
export const getAllBrands = async(req ,res , next )=>{
    try {
        const Brands = await BrandModel.find() ;
        logger.info("ALL BRANDS ! " , Brands)
        res.status(200).json({Data : Brands}) ;
    } catch (error) {
        logger.error("This is error" , [error])
        return next(new ApiError(`System Error ${error}` , 404)) ;
    }
};
/////////////////////////////////////// GET BRAND BY ID /////////////////////////////////////////////////////
export const getBrandById = async(req ,res , next)=>{
    try{
        const id = req.params.id  ;
        const Brand = await BrandModel.findById(id) ;
        if(!Brand){
            logger.error("Brand isn't found by id")
            return next(new ApiError(`Brand isn't found by id : ${id}` , 404))
            // res.status(404).json({message : `category isn't found by id : ${id}`})
        }
        logger.info("BRAND ! >>>>> " , Brand)
        res.json({data: Brand}).status(201) ;
    }catch(error){
        logger.error("This is error" , [error])
        return next(new ApiError(`System Error ${error}` , 404)) ;
    }
};
/////////////////////////////////////// UPDATA BRAND /////////////////////////////////////////////////////
export const updateBrand = async(req , res , next)=>{
    try {
        const id = req.params.id  ;
        const name = req.body.name ;
        const Brand = await BrandModel.findByIdAndUpdate(
            {_id : id},
            {name , slug : slugify(name)},
            {new : true}
        );
        if(!Brand){
            logger.error("Brand isn't found by id")
            return next(new ApiError(`Brand isn't found by id : ${id}` , 404))
        }
        logger.info("BRAND UPDATED " , Brand)
        res.json({data: Brand}).status(204) ;
    } catch (error) {
        logger.error("This is error" , [error])
        return next(new ApiError(`System Error ${error}` , 404)) ;
    }
};
/////////////////////////////////////// DELETE BRAND /////////////////////////////////////////////////////
export const deleteBrand =async(req , res , next)=>{
    try {
        const id = req.params.id  ;
        const Brand = await BrandModel.findByIdAndDelete(id) ;
        if(!Brand){
            logger.error("Brand isn't found by id")
            return next(new ApiError(`Brand isn't found by id : ${id}` , 404))
        }
        logger.info("BRAND DELETED")
        res.json({message : "delete is success"}).status(201) ;
    } catch (error) {
        logger.error("This is error" , [error])
        return next(new ApiError(`System Error ${error}` , 404)) ;
    }
};