import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';


//IF CORRECT AND MATCHING TOKEN IS PRESENT IN REQUEST HEADER ONLY THEN IT WILL ALLOW THAT PAGE TO OPEN
export const requireSignIn=async (req,res,next)=>{
    
    try {
        const decode= JWT.verify(req.headers.authorization,process.env.JWT_SECRET_KEY); //USED FOR PROTECTION 
        req.user=decode;
        next();
    } catch (error) {
        console.log("error occurred: "+error);
    }
}

//ADMIN AUTHENTICATION MIDDLEWARE

export const isAdmin=async (req,res,next)=>{
try{
     const user= await userModel.findById(req.user._id);
     if(user.role!==1){
        res.send({
            success:false,
            message:"Not an authorized admin"
        });
     }
     else{
        next();
     }
}
catch(error){
 console.log("errrorr in admin middleware");
 res.status(401).send({
    success:false,
    message:"Error in admin middleware",
    error
 })
}

}