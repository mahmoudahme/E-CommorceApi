import express from "express";
import {verifyUser , verifyAdmin , verifyToken} from "../Utils/verifyToken.js";
import { createProduct, deleteProduct, getAllProducts, getProductByID, updateProduct } from "../controllers/productController.js";
import { createProductValidator, deleteProductValidator, getProductValidator, updateProductValidator } from "../Utils/productValidator.js";

const router = express.Router();

router.post("/" , verifyAdmin ,createProductValidator,createProduct);
router.get("/" , (req , res)=>{
    res.render("index")
});
router.get("/:id" , getProductValidator , getProductByID);
router.delete("/:id" , verifyAdmin, deleteProductValidator, deleteProduct);
router.put("/:id" , verifyAdmin,updateProductValidator , updateProduct);

export default router;
