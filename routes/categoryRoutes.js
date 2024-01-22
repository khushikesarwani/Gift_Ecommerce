import express from 'express';
import { requireSignIn,isAdmin} from "../middlewares/authMiddleware.js";
import {createCategoryContoller
    ,updateCategoryController
    ,categoryController,
    singleCategoryController,
    deleteCategoryController} from '../controllers/categoryController.js';

const router=express.Router();

//routes

//creation of a new category
router.post('/create-category',requireSignIn,isAdmin,createCategoryContoller);

//updation of new category
router.put('/update-category/:id',requireSignIn,isAdmin,updateCategoryController);

//gaetting all categories
router.get('/get-category',categoryController);

//getting single category
router.get('/single-category/:slug',singleCategoryController);

//deleting category
router.delete('/delete-category/:id',requireSignIn,isAdmin,deleteCategoryController);


export default router;