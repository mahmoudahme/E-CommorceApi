import express from "express" ;
import {verifyAdmin ,verifyUser , verifyToken} from "../Utils/verifyToken.js"
import { createAndAddUserCart, deleteProductFromCart, makeOrderFromCart, userCart } from "../controllers/cartController.js";
const router = express.Router();

router.post("/" , verifyUser , createAndAddUserCart );
router.get("/" , verifyUser , userCart)
router.delete("/:cartID/:productID" , verifyUser , deleteProductFromCart)
router.post("/:cartID/:productID" , verifyUser , makeOrderFromCart)
export default router 