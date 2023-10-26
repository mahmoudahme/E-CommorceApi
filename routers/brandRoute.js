import express from "express" ;
import {verifyAdmin ,verifyUser , verifyToken} from "../Utils/verifyToken.js"
import {createBrand, deleteBrand, getAllBrands, getBrandById, updateBrand } from "../controllers/brandController.js";

const router = express.Router();

router.post("/" , verifyAdmin , createBrand);
router.get("/" , verifyToken , getAllBrands);
router.get("/:id" , verifyToken , getBrandById);
router.delete("/:id" , verifyAdmin , deleteBrand);
router.put("/:id" , verifyAdmin , updateBrand);

export default router