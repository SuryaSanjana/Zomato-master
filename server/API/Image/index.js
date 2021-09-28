//Libraries
import express from "express";
import passport from "passport";
//import AWS from "aws-sdk";
import multer from "multer";
//we installed multer to have images uploaded by user are properly processed in our server


//Database Model
import { ImageModel } from "../../database/allModels";


//Utilities
import { s3Upload } from "../../Utils/AWS/s3";

const Router = express.Router();

// //AWS s3 bucket config
// const s3Bucket =  new AWS.S3({
//     accessKeyId : process.env.AWS_S3_ACCESS_KEY,
//     secretAccessKey: process.env.AWS_S3_SECRET_KEY,
//     region: "ap-south-1",
// });


//Multer config
const storage = multer.memoryStorage();   //images stored in RAM
const upload = multer({storage});


/*
Route     /
Des       Get Image details
Params    _id
Access    Public
Method    GET  
*/
Router.get("/:_id", async (req, res) => {
   try {
     const image = await ImageModel.findById(req.params._id);
 
     return res.json({ image });
   } catch (error) {
     return res.status(500).json({ error: error.message });
   }
 });

 
/* 
Route   /
Des     Upload given image to  s3 Bucket and save file link to MongoDB
Paarams  id
Access   Public
Method  GET
*/

Router.post("/",upload.single("file"), async(req,res)=>{
   try{
    
     const file=req.file;
     //s3 bucket options
     const bucketOptions = {
        Bucket:"shapeaizomatoprojectbucket",
        Key:file.originalname,  //unique key 
        Body:file.buffer,   //storage in RAM is assigned for this object
        ContentType :file.mimetype, 
        ACL:"public-read",   //ACL- ACcess Control List
     };
    //  //upload to s3
    //   const s3Upload = (options) =>{
    //     return new Promise((resolve,reject)=> s3Bucket.upload(options,(error,data)=>{
    //         if(error) return reject(error);
    //         return resolve(data);
    //     })
    //     );
    //   };
    
     const uploadImage = await s3Upload(bucketOptions);  //returns Url of image nd uploads to s3

     return res.status(200).json({uploadImage});
   }catch(error){
    return res.status(500).json({error:error.message});
   }
});



export default Router;
