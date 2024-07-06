import Express from "express";
import { brainTreeController, brainTreePaymentController, CreateProductController, deleteProductController, getProductController, getSingleController, productCategoryController, productCountController, productFiltersController, productListController, ProductPhotoController, searchProductController, UpdateProductController } from "../controllers/ProductController.js";
import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = Express.Router()

// create router
router.post('/create-product', requireSignin, isAdmin, formidable(), CreateProductController)

//Update product
router.put('/update-product/:pid', requireSignin, isAdmin, formidable(), UpdateProductController)

//Get All routes
router.get('/get-product', getProductController)

//Single Product
router.get('/getsinge-product/:slug', getSingleController)

//Get Photo
router.get('/product-photo/:pid', ProductPhotoController)

//delete Product
router.delete('/delete-product/:pid', deleteProductController)

//filter Product
router.post('/product-filters', productFiltersController)

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//search Product
router.get('/search/:keyword', searchProductController);

//payment route
//token
router.get('/braintree/token', brainTreeController);

//payment Routes
router.post('/braintree/payment',requireSignin, brainTreePaymentController)

//Category wise Poduct
router.get('/product-category/:slug',productCategoryController)

export default router