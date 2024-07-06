import express from "express"
import { registerController, loginController, testController, forgetPasswordController,  getOrdersController, getAllOrdersController, orderStatusController } from "../controllers/authController.js"
import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js";

//Router object 
const router = express.Router();

//Routing
//Register || Method Post
router.post("/register", registerController);

// LOGIN || Method
router.post('/login', loginController);

//Forget Password POST
router.post('/forget-password', forgetPasswordController)

//test  routes 
router.get('/test', requireSignin, isAdmin, testController);

//Protected User route Auth
router.get('/user-auth', requireSignin, (req, res) => {
    res.status(200).send({ ok: true });
})
//Protected Admin route Auth
router.get('/admin-auth', requireSignin,isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
})

//orders
router.get('/orders',requireSignin,getOrdersController)

//all  orders
router.get('/all-orders',requireSignin,isAdmin, getAllOrdersController)

//order status
router.put("/order-status/:orderId",requireSignin,isAdmin,orderStatusController)

export default router; 