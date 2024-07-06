import ProductModel from "../models/ProductModel.js"
import categoryModel from "../models/CategoryModel.js" 
import fs from 'fs'
import slugify from "slugify"
import braintree from "braintree";
import orderModel from "../models/orderModel.js";
import dotenv from 'dotenv'

dotenv.config();
//payment Gateway
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_Merchant_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});
export const CreateProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields
        const { photo } = req.files

        //validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: 'Name is Required' })
            case !description:
                return res.status(500).send({ error: 'description is Required' })
            case !price:
                return res.status(500).send({ error: 'Price is Required' })
            case !category:
                return res.status(500).send({ error: 'Category is Required' })
            case !quantity:
                return res.status(500).send({ error: 'Quantity is Required' })
            case !photo && photo.size > 1000000:
                return res.status(500).send({ error: 'Photo is Required and should be less than 1MB' })
        }

        const Products = new ProductModel({ ...req.fields, slug: slugify(name) })
        if (photo) {
            Products.photo.data = fs.readFileSync(photo.path)
            Products.photo.contentType = photo.type
        }
        await Products.save()
        res.status(201).send({
            success: true,
            message: 'Product Created Successfully',
            Products
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error is Creating Product",
            error
        })
    }
}

// get All product controller
export const getProductController = async (req, res) => {
    try {
        const products = await ProductModel.find({}).populate('category').select("-photo").limit(12).sort({ createdAT: -1 })
        res.status(200).send({
            success: true,
            countTotal: products.length,
            message: 'AllProducts',
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Getting All Product',
            error: error.message
        })
    }
}
// Single Product Controller
export const getSingleController = async (req, res) => {
    try {
        const product = await ProductModel.findOne({ slug: req.params.slug }).select("-photo").populate('category')
        res.status(200).send({
            success: true,
            message: 'Single Product Search Successully',
            product
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: true,
            message: "Error in Getting Single Product",
            error
        })
    }
}
//photo Controller
export const ProductPhotoController = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.pid).select('photo')
        if (product.photo.data) {
            res.set('Content-type', product.photo.contentType)
            return res.status(200).send(product.photo.data);
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Geting Photo',
            error
        })
    }
}

// Delete Controller
export const deleteProductController = async (req, res) => {
    try {
        await ProductModel.findByIdAndDelete(req.params.pid).select("-photo")
        res.status(200).send({
            success: true,
            message: "Product Deleted Successfully",

        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: true,
            message: 'Error while deleting',
            error
        })
    }
}

//Update Product Controller
export const UpdateProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields
        const { photo } = req.files

        //validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: 'Name is Required' })
            case !description:
                return res.status(500).send({ error: 'description is Required' })
            case !price:
                return res.status(500).send({ error: 'Price is Required' })
            case !category:
                return res.status(500).send({ error: 'Category is Required' })
            case !quantity:
                return res.status(500).send({ error: 'Quantity is Required' })
            case !photo && photo.size > 10000000:
                return res.status(500).send({ error: 'Photo is Required and should be less than 1MB' })
        }

        const Products = await ProductModel.findByIdAndUpdate(req.params.pid, { ...req.fields, slug: slugify(name) }, { new: true })
        if (photo) {
            Products.photo.data = fs.readFileSync(photo.path)
            Products.photo.contentType = photo.type
        }
        await Products.save()
        res.status(201).send({
            success: true,
            message: 'Product Updated Successfully',
            Products
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: true,
            message: 'Error In while Updating',
            error
        })
    }
}

//Search Product Controller
export const searchProductController = async (req, res) => {
    try {
        const { keyword } = req.params;
        const results = await ProductModel.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        }).select("-photo")
        res.json(results)
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Error is Search product Api",
            error
        })
    }
}

//Filter Controller
export const productFiltersController = async (req, res) => {
    try {
      const { checked, radio } = req.body;
      let args = {};
      if (checked.length > 0) args.category = checked;
      if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
      const products = await ProductModel.find(args);
      res.status(200).send({
        success: true,
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error WHile Filtering Products",
        error,
      });
    }
  };

// product count
export const productCountController = async (req, res) => {
    try {
        const total = await ProductModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success: true,
            total,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            message: "Error in product count",
            error,
            success: false,
        });
    }
};

// product list base on page
export const productListController = async (req, res) => {
    try {
        const perPage = 15;
        const page = req.params.page ? req.params.page : 1;
        const products = await ProductModel
            .find({})
            .select("-photo")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "error in per page ctrl",
            error,
        });
    }
};
//paymetn Gateway api for token
export const brainTreeController = async (req, res) => {
    try {
        gateway.clientToken.generate({},function(err,response){
            if (err) {
                res.status(500).send(err)
            }else{
                res.send(response)
            }
        })
    } catch (error) {
        console.log(error)
    }
}

//For payment
export const brainTreePaymentController = async (req, res) => {
try {
     const {cart,nonce}=req.body
     let total=0
     cart.map((i)=>{total +=i.price})
     let newTransaction=gateway.transaction.sale({
        amount:total,
        paymentMethodNonce:nonce,
        options:{
            submitForSettlement:true
        }
     },
     function(error,result){
        if (result) {
            const order= new orderModel({
                produts:cart,
                payment:result,
                buyer:req.user._id
            }).save()
            res.json({ok:true})
        }else{
            res.status(500).send(error)
        }
     }
     )
} catch (error) {
    console.log(error)
}
}

// get prdocyst by catgory
export const productCategoryController = async (req, res) => {
    try {
      const category = await categoryModel.findOne({ slug: req.params.slug });
      const products = await ProductModel.find({ category }).populate("category");
      res.status(200).send({
        success: true,
        category,
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        error,
        message: "Error While Getting products",
      });
    }
  };