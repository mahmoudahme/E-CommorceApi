import JsonWebToken from "jsonwebtoken";
import {ApiError} from "../Utils/apiError.js" ;
import dotenv from "dotenv" ;
dotenv.config({path : 'config/config.env'})

export const verifyToken = (req , res , next)=>{
    const token = req.cookies.access_token ;
    if(!token){
        return next(new ApiError("You are not authenticated!" , 401)) ;
    }

    JsonWebToken.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(new ApiError("Token is not valid!" , 403)) ;
        req.user = user;
        next();
      });
};

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.user.id === req.params.id || !req.user.isAdmin) {
        next();
      } else {
        return next(new ApiError("You are not authenticated!" , 401)) ;
      }
    });
  };
  
  export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.user.isAdmin) {
        next();
      } else {
        return next(new ApiError("You are not authenticated!" , 401)) ;
      }
    });
  };