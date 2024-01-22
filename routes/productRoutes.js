import express from 'express';
import {isAdmin, requireSignIn} from '../middlewares/authMiddleware.js';
import {createProductController,
    getProductController,
    getSingleProductController,
    productPhotoController
,deleteProductController,
updateProductController,
productsFilterController,
productCountController,
productListController,
searchProductController,
relatedProductCntroller,
productCategoryController,
braintreeTokenController,
brainTreePaymentController} from '../controllers/ProductController.js';
import formidable from 'express-formidable'; 

const router=express.Router();

//routes
router.post('/create-product',requireSignIn,isAdmin,formidable(),createProductController);

//get products
router.get('/get-product',getProductController);

//get single product
router.get('/get-product/:slug',getSingleProductController);

//get photo
router.get('/product-photo/:pid',productPhotoController);

//delete product
router.delete('/delete-product/:pid',requireSignIn,isAdmin,deleteProductController);

//updation
router.put('/update-product/:pid',requireSignIn,isAdmin,formidable(),updateProductController);

//filter product
router.post('/product-filters',productsFilterController);

//=========For Pagination=======================================

//product count
router.get('/product-count',productCountController);

//products  per page
router.get('/product-list/:page',productListController);

//search product
router.get('/search/:keyword',searchProductController);

//similar-products
router.get('/related-product/:pid/:cid',relatedProductCntroller);

//category wise product
router.get(`/product-category/:slug`,productCategoryController);


//for GATEWAY=======================================================

//TOKEN GETTING from braintree

router.get('/braintree/token',braintreeTokenController);

//payments

router.post('/braintree/payment',requireSignIn,brainTreePaymentController);

export default router;
