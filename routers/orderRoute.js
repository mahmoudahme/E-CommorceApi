import express from "express";
import {verifyUser , verifyAdmin , verifyToken} from "../Utils/verifyToken.js";
import { makeOrder ,deleteOrder , getOrderById, getAllOrdersForAdmin, getAllOrdersForUser} from "../controllers/orderController.js";
import { createOrderValidator } from "../Utils/orderValidator.js";

const router = express.Router();
router.post("/:id" ,verifyUser, createOrderValidator,makeOrder);
router.get("/admin" , verifyAdmin , getAllOrdersForAdmin);
router.get("/" , verifyUser , getAllOrdersForUser);
router.get("/:id" , verifyUser , getOrderById);
router.delete("/:id" , verifyUser , deleteOrder);

export default router; 