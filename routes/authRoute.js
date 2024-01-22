import express from "express";
import {registerController,
    loginController,
    testController,
    forgotController,
    updateProfileController,
    getOrdersController,
    getAllOrdersController,
    orderStatusController,
    getAllUsersController} from '../controllers/authController.js'
import { requireSignIn,isAdmin} from "../middlewares/authMiddleware.js";

//router object creation bcoz we are keeping routing in different files
const router=express.Router();

//routing----------------

//register  || POST Method

router.post('/register',registerController);

//LOGIN || POST METHOD
router.post('/login',loginController);

//FORGOT PASSWORD
router.post('/forgot-password',forgotController);


//protected route admin
router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true});
});

//protected route----using for dashboard
router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({ok:true});
});

//testing route(demo)
router.get('/test',requireSignIn,isAdmin,testController);

//UPDATE USER pROFILE
router.put('/profile',requireSignIn,updateProfileController);


//for fetching orders history by user
router.get('/orders',requireSignIn,getOrdersController);


//for getting all orders
router.get('/all-orders',requireSignIn,isAdmin,getAllOrdersController);

//order status update
router.put('/order-status/:orderId',requireSignIn,isAdmin,orderStatusController);

//All users data
router.get('/all-users',requireSignIn,isAdmin,getAllUsersController);

export default router;