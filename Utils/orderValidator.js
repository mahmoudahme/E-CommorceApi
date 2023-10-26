import slugify from "slugify";
import { check , body  } from "express-validator";
import validatorMiddleware from "../middleWares/validator.js";
import User from "../models/User.js";
import ProductModel from "../models/ProductModel.js";

export const createOrderValidator = [
    check('productId')
    .notEmpty()
    .withMessage('Product must be belong to a System')
    .isMongoId()
    .withMessage('Invalid ID formate')
    .custom((productId) =>
    ProductModel.findById(productId).then((product) => {
        if (!product) {
          return Promise.reject(
            new Error(`No category for this id: ${productId}`)
          );
        }
      })
    ),
]
