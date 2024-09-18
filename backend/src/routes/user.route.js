import { Router } from "express";
import { addUser,loginUser,allUsers,editUser,deletUserRecord,findSingleUser} from "../controllers/user.controller.js";
import { authenticateUser,isAdmin } from "../middlewares/auth.js";


const router=Router();

router.post("/addUser",addUser);
router.post("/login",loginUser);
router.get("/api/u-v/allUsers",authenticateUser,isAdmin,allUsers)
router.patch("/editUser/:id",isAdmin,editUser)
router.delete("/delUser/:id",isAdmin,deletUserRecord)
router.get("/singleUser/:id",isAdmin,findSingleUser)

export default router;