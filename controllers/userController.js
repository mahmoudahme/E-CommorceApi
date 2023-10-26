import { ApiError } from "../Utils/apiError.js";
import User from "../models/User.js";
import { LoggerService } from "../services/logger.js";
const logger = new LoggerService("userController");
////////////////////////////////GET ALL USERS /////////////////////////////////////////////////
export const getAllUsers = async(req , res , next)=>{
    try {
        const Users = await User.find();
        logger.info("GET ALL USERS" , Users);
        res.status(200).json({Data : Users});
        
    } catch (error) {
        logger.error("THIS IS ERROR " , [error])
        return next(new ApiError(`System Error ${error}`) , 404)
    }
};
///////////////////////////////GET USER BY ID /////////////////////////////////////////////////
export const getUerById = async(req, res ,next )=>{
    try {
        const userID = req.params.id ;
        const user = await User.findById(userID);
        logger.info("GET USER BY ID  ", user)
        res.status(200).json({user : user});
    } catch (error) {
        logger.error("THIS IS ERROR " , [error])
        return next(new ApiError(`System Error ${error}`) , 404)
    }
};
//////////////////////////////DELETE USER //////////////////////////////////////////////////////
export const deleteUser = async(req , res , next )=>{
    try {
        const userID = req.params.id ;
        await User.findByIdAndDelete(userID)
        logger.info("USER IS DELETED")
        res.status(200).json({message : "This user is deleted " });
    } catch (error) {
        logger.error("THIS IS ERROR " , [error])
        return next(new ApiError(`System Error ${error}`) , 404)
    }
};  
//////////////////////////////UPDATA USER //////////////////////////////////////////////////////
export const updateUser = async(req, res , next )=>{
    try {
        const userID = req.params.id ;
        const newDataOfUser = await User.findByIdAndUpdate( 
            userID, 
            { $set: req.body },
            { new: true }
        );
        logger.info("USER UPDATED ! " , newDataOfUser)
        res.status(200).json({user : newDataOfUser});
    } catch (error) {
        logger.error("THIS IS ERROR " , [error])
        return next(new ApiError(`System Error ${error}`) , 404);
    }
}