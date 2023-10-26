import express from "express";
import {verifyUser , verifyAdmin , verifyToken} from "../Utils/verifyToken.js";
import { createCategort, deleteCategort, getAllCategorts, getCategortById, updateCategort } from "../controllers/categoryController.js";

const router = express.Router();

router.post("/" , verifyAdmin , createCategort);
router.get("/" , verifyToken , getAllCategorts);
router.get("/:id" , verifyToken , getCategortById);
router.delete("/:id" , verifyAdmin , deleteCategort);
router.put("/:id" , verifyAdmin , updateCategort);

export default router;