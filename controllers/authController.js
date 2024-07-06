import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js"
import JWT from "jsonwebtoken";


// Router Signup create user
export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body;
        // Validators
        if (!name) {
            return res.send({ message: 'Name is Required' });
        }
        if (!email) {
            return res.send({ message: "Email Is Required" });
        }
        if (!password) {
            return res.send({ message: "Password Is Required" });
        }
        if (!phone) {
            return res.send({ message: "Phone No Is Required" });
        }
        if (!address) {
            return res.send({ message: "Address Is Required" });
        }
        if (!answer) {
            return res.send({ message: "Nick Name Is Required" });
        }

        // Check user
        const Exitsinguser = await userModel.findOne({ email });
        // Existing User
        if (Exitsinguser) {
            return res.status(200).send({
                success: false,
                message: 'Alredy Register please Login'

            });
        }


        // Register User
        const hashedpassword = await hashPassword(password)
        // save 
        const user = await new userModel({ name, email, address, phone, password: hashedpassword, answer }).save()
        res.status(200).send({
            success: true,
            message: 'User Register Succesfully',
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Registation',
            error
        });
    }
};

//POST LOGIN
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid Email or Password"
            })
        }
        // User check
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not Registerd"
            });
        }

        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password"
            });
        }

        //token  { expiresIn: "9d" }
        const token = JWT.sign({ _id: user._id }, process.env.JWT_Secret);
        res.status(200).send({
            success: true,
            message: "Login Successully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                answer: user.answer,
                role: user.role
            },
            token,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Login',
            error
        });
    }
}
//Forget Password Controller
export const forgetPasswordController = async (req, res) => {
    try {
        const { email, answer, newpassword } = req.body
        if (!email) {
            res.status(400).send({ message: "Email is Required" })
        }
        if (!answer) {
            res.status(400).send({ message: "Answer is Required" })
        }
        if (!newpassword) {
            res.status(400).send({ message: "New Password is Required" })
        }
        //check
        const user = await userModel.findOne({ email, answer, newpassword })
        //Validation
        if (!user) {
            res.status(400).send({
                success: false,
                message: "Wrong Email Or Password"
            })
        }
        const hashed = await hashPassword(newpassword);
        await userModel.findByIdAndUpdate(user._id, { password: hashed });
        res.status(200).send({
            success: true,
            message: "Password Reset Successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Something went Wrong",
            error
        })
    }
}

//test controller
export const testController = (req, res) => {
    try {
        res.send("Proected Routes")
    } catch (error) {
        console.log(error);
        res.send({ error })
    }
}

//orderrs

export const getOrdersController = async (req, res) => {
    try {
        const orders = await orderModel
            .find({})
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error WHile Geting Orders",
            error,
        });
    }
};

//All orders
export const getAllOrdersController = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error WHile Geting Orders",
            error,
        });
    }
}

//order status
export const orderStatusController=async(req,res)=>{
try {
    const {orderId}= req.params
    const {status}=req.body
    const orders=await orderModel.findByIdAndUpdate(orderId,{status},{new:true})
    res.json(orders)
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:'Error while updatting Orders',
        error
    })
}
}