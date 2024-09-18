import { Router } from "express";
import { addProduct,allProducts,singleProduct,orderProduct ,viewAllOrders} from "../controllers/product.controller.js";
import { authenticateUser,isAdmin } from "../middlewares/auth.js";


const router=Router();
router.post('/addProduct',authenticateUser,isAdmin ,addProduct);
router.get('/allProducts',allProducts);
router.get('/allProducts/:id',singleProduct);
router.post('/orderProduct',orderProduct);


//admin route
router.get('/viewAllOrders',isAdmin,viewAllOrders)






export default router;