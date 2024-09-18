import express from "express";
import multer from "multer";
import cors from "cors";
import { authenticateUser } from "./middlewares/auth.js";

const app = express();
const upload = multer();

app.use(cors());
app.use(express.json());
app.use(upload.array());

//user routes
import userRouter from "./routes/user.route.js";
app.use("/user", userRouter);


//products routes
import productRouter from './routes/products.route.js'
app.use('/product',productRouter)

//Product orderRoutes




export { app };
