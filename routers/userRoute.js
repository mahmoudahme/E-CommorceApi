import  express  from "express";
import {verifyAdmin ,verifyUser , verifyToken} from "../Utils/verifyToken.js"
import { deleteUser, getAllUsers, getUerById, updateUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/" , verifyAdmin , getAllUsers);
router.get("/:id" , verifyUser , getUerById);
router.delete("/:id" , verifyUser , deleteUser);
router.put("/:id" , verifyUser , updateUser);

export default router