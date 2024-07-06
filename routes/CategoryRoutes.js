import express  from "express";
import { categoryController, createCategoryController,deleteCategoryController,SingleCategoryController,updateCategoryController } from "../controllers/CategoryController.js";
import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js";

const router= express.Router()

//routes
router.post('/create-category',requireSignin,isAdmin,createCategoryController)

//update-category
router.put('/update-category/:id',requireSignin,isAdmin,updateCategoryController)

//Get All ategory
router.get('/allcategory', categoryController)

//Single Category
router.get('/single-category/:slug',SingleCategoryController)

//Delet Category
router.delete('/delete-category/:id',requireSignin,isAdmin,deleteCategoryController)

export default router