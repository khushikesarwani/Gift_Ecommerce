import userModel from "../models/userModel.js";
import {comparePassword, hashPassword} from "../helpers/authhelper.js"
import OrderModel from "../models/OrderModel.js";
import JWT from "jsonwebtoken";
const registerController=async(req,res)=>{
    try{
              const {name,email,password,phone,address,answer}=req.body;
              //validations
              if(!name){
                return res.send({message:'name is required'});
              }
              if(!email){
                return res.send({message:'email is required'});
              }
              if(!password){
                return res.send({message:'password is required'});
              }
              if(!phone){
                return res.send({message:'phone is required'});
              }
              if(!address){
                return res.send({message:'address is required'});
              }
              if(!answer){
                return res.send({message:'answer is required'});
              }
              //existing User Check
              const existingUser= await userModel.findOne({email:email});
              if(existingUser){
                return res.status(200).send({
                  success:false,
                  message:"Already is Registered user, Please Login"
                })
              }

              //registering user
              const hashedPassword =await hashPassword(password);
              const user=await new userModel({
                name,
                email,
                password:hashedPassword,
                address,
                phone,
              answer}).save();

             return   res.status(201).send({
                success:true,
                message:"User Registered successfully",
                user,
              })
    }
    catch(error){
          
          res.status(500).send({                   
            success:false,
            message:"Error in registering a user",
            error
          });
    }

}

//LoginController Area

const loginController=async(req,res)=>{

  try{

 const {email,password}= req.body;
 
 //validations
 if(!email || !password)
 {
  return res.send({
    success:false,
    message:`Invalid email or password ${email}`,
 
  });
 }
 //checking if user exists
 const user=await userModel.findOne({email});
 if(!user){

  return  res.send({
    success: false,
    message:'Email is not registerd'
  });
  
  
 }

 const match= await comparePassword(password,user.password);
 if(!match){
  res.status(200).send({
    success:false,
    message:"invalid password"
  });
  return;  //this statement is so imp as if this will run to check token but it will crash the app.
 }

//token
const token= await JWT.sign({_id: user._id},process.env.JWT_SECRET_KEY,{expiresIn: '7d'});

res.status(200).send({
  success:true,
  message:"Login successfully",
  user:{
    name:user.name,
    email:user.email,
    phone:user.phone,
    address:user.address,
    role:user.role,
  },
  token
});
  }
  catch(error){
    
    res.status(500).send({
      success:false,
      message:"Error in login"
    ,error
    })
  }
}

// FORGOT PASSWORD AREA
 const forgotController=async(req,res)=>{
  try {
   const {email,answer,newPassword}=req.body;
   if(!email){
    res.status(400).send({message:"Email is required"});
   }
   if(!newPassword){
    res.status(400).send({message:"New Password is required"});
   }
   if(!answer){
    res.status(400).send({message:"Answer is required"});
   }

   const user =await userModel.findOne({email,answer});
   if(!user){
    return res.status(404).send({
      success:false,
      message:"Wrong Email or Answer"
    })
   }
   const hashed= await hashPassword(newPassword);
   await userModel.findByIdAndUpdate(user._id,{password:hashed});
   res.status(200).send({
    success:true,
    message:"Password Reset Successfully"
   });

    
  } catch (error) {
    
    
    res.status(500).send({
      success:false,
      message:"Something went wrong",
      error
    })
  }
 }


//test route demo
const testController=(req,res)=>{
  res.send("protected test router");
}

//update user profile
export const updateProfileController=async(req,res)=>{
try {
  
  const {name,email,password,address,phone}=req.body;
  const user = await userModel.findById(req.user._id);


  //password
  if(password && password.length<6){
    res.json({error:"Atleast 6 character long password is required "});
      return;
  }

  const hashedPasswordk= password ? await hashPassword(password) : undefined; 

const updatedUser= await userModel.findByIdAndUpdate(req.user._id,{
  name:name || user.name,
  phone: phone || user.phone,
  address: address || user.address,
  password: hashedPasswordk || user.password,

},{new:true});

res.status(200).send({
  success:true,
  message:"profile updated successfully",
  updatedUser
});

} catch (error) {
 
  res.status(400).send({
    success:false,
    message:"Error in profile update",
    error
  })
}
}


//orders controller -user side

export const getOrdersController=async(req,res)=>{
  try {
    const orders= await OrderModel.find({buyer:req.user._id}).populate('products','-photo').populate('buyer','name');
    res.json(orders);
  } catch (error) {
   
    res.status(500).send({
      success:false,
      message:"Errorwhile getting orders",
      error
    });
  }
}

//for getting all orders-admin side
export const getAllOrdersController=async(req,res)=>{
  try {

    const orders= await OrderModel.find({})
    .populate('products','-photo')
    .populate('buyer','name');
    ;
    res.json(orders);
    
  } catch (error) {
    
  
    res.status(500).send({
      success:false,
      message:"Error while getting all  orders",
      error
    });
  }
}

//order status updation 

export const orderStatusController=async(req,res)=>{
  try {
    const {orderId}=req.params;
    const {status}=req.body;
    
    const orders= await OrderModel.findByIdAndUpdate(orderId,{status},{new:true});
    res.json(orders);
  } catch (error) {
   
    res.status(500).send({
      success:false,
      message:"Error in order-status-update",
      error
    });
  }
}

//get all users data
export const getAllUsersController=async(req,res)=>{
  try {
    
    const users=await userModel.find({});
    res.status(200).send({
      success:true,
      message:"List of all users",
       users
  });

  } catch (error) {
   
    res.status(500).send({
      success:false,
      message:"Error in getting users details",
      error
    });
  }
}




export {registerController,loginController,testController,forgotController};
