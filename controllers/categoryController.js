
import CategoryModel from '../models/CategoryModel.js';
import slugify from 'slugify';

export const  createCategoryContoller = async (req,res)=>{
try {
    const {name}=req.body;
    if(!name){
      return  req.status(401).send({
            message:"Name is required"
        });
    }
    //cheking if same category name  exist

    const existingCategory= await CategoryModel.findOne({name});
    if(existingCategory){
        return res.status(200).send({
            success:true,
            message:"Category already exist",
        });
    }

const category= await new CategoryModel({name,slug:slugify(name)}).save();

return res.status(201).send({
    success:true,
    message:"New Category Created",
    category:category,
})
    
} catch (error) {

    res.status(500).send({
        success:false,
        error,
        message:"Error in category ",
        category
    })
}
}

//update work
export const updateCategoryController =async (req,res)=>{
    try {
        const {name}=req.body;
        const {id}=req.params;

        const category = await CategoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true});
         res.status(200).send({
            success:true,
            message:"Category Updated Sucessfully",
            category
         })
        
    } catch (error) {
        
        res.status(500).send({
            success:false,
            message:"Couldn't update Category"

        })
    }

}

//getting all categories

export const categoryController=async (req,res)=>{
    try{
                    const category=await CategoryModel.find({});
                    res.status(200).send({
                        success:true,
                        message:"List of all categories",
                        category
                    })
    }
    catch(error){
        
        res.send({
            success:false,
            message:"Couldn't get category list"
        })
    }
}


//getting single category

export const singleCategoryController=async(req,res)=>{
    try{
     
        const category=await CategoryModel.findOne({slug:req.params.slug});
        res.status(200).send({
            success:true,
            message:"Got that category",
            category
        })
    }
    catch(error){
        
        res.status(500).send({
             success:false,
             message:"Couldn't get that category"
            
        });
    }
}
//

//deletion 
export const deleteCategoryController=async(req,res)=>{
    try {
        const {id}=req.params;
 await CategoryModel.findByIdAndDelete(id);
 res.status(200).send({
    success:true,
    message:"Category Deleted SuccessFully"
 });

    } catch (error) {
       
        res.status(500).send({
            success:false,
            message:"Error in deletion",
            error
        })
    }
}