import CategoryModel from "../models/CategoryModel.js";
import slugify from "slugify"

export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(401).send({
                message: 'Name is Required',
            })
        }
        const existingCategory = await CategoryModel.findOne({ name })
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: 'Category Already Existis'
            })
        }
        const Category = await new CategoryModel({ name, slug: slugify(name) }).save()
        res.status(201).send({
            success: true,
            message: "New Category Created",
            Category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Category',
            error
        })
    }
}

//Update Category 
export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params
        const category = await CategoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true })
        res.status(200).send({
            success: true,
            message: 'categoryCreatedSuccfully',
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error While Updating Category',
            error
        })
    }
}

//Get All Cartegory
export const categoryController = async (req, res) => {
    try {
        const category = await CategoryModel.find({})
        res.status(200).send({
            success: true,
            message: 'All Category List',
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'Error while Getiing All Category'
        })
    }
}

//Single Category
export const SingleCategoryController = async (req, res) => {
    try {
     
        const category=await CategoryModel.findOne({slug:req.params.slug})
        res.status(200).send({
            success:true,
            message:'Get Single Category Successfully',
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while getting Single category',
            error
        })
    }
}

// Delete Controller
export const deleteCategoryController=async(req,res)=>{
    try {
        const {id}=req.params
        await CategoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:"Successfully Deleted"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while in deleting Category',
            error
        })
    }
}