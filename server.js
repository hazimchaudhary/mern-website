import  express  from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import CategoryRoutes from "./routes/CategoryRoutes.js";
import ProductRoutes from './routes/ProductRoutes.js'
import cors from 'cors'

// conigure ENV
dotenv.config();

// Database Config
connectDB(); 

// rest object 
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routers
app.use("/api/v1/auth",authRouter)
app.use("/api/v1/category",CategoryRoutes)
app.use("/api/v1/product",ProductRoutes)

//rest api
app.get('/',(req,res)=>{
    res.send({
        message:"Hello Wolrd Welcome to E-Commerce",
    });
});

// PORT 
const port=process.env.PORT || 8080;

// run listen
app.listen(port,()=>{
    console.log(`Server Runing on ${process.env.Dev_ENV} mode on PORT ${port}`)
})
