//Library
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Models
import { UserModel } from "../../database/user";


const Router = express.Router();

/*
route /signup
description  registrer new user
Params  none
Access  public
Method  post
*/
Router.post("/signup",async(req,res)=>{
  try{
   // const {email,password,fullname,phoneNumber} = req.body.credentials;

    // //check whether email exist
    // const checkUserByEmail = await UserModel.findOne({email});  //here key nd value both are email
    // const checkUserByPhone = await UserModel.findOne({phoneNumber}); 
    

    // if(checkUserByEmail || checkUserByPhone){
    //     return res.json({error:"User already exist"});
    // }
    await UserModel.findByEmailAndPhone( req.body.credentials);

    // //hash the password  encrryption of password
    // const bcryptSalt = await brcrypt.genSalt(8);

    // const hashedPassword = await bcrypt.hash(password,bcryptSalt);

    //save to database
    const newUser = await UserModel.create(
      // {
      //   ...req.body.credentials,
      //   password:hashedPassword,
      // }
      req.body.credentials
    );


    //generate JWT auth token
     //const token= jwt.sign({user:{fullname,email} }, "ZomatoApp");
      const token =  newUser.generateJwtToken();

    //return
    return res.status(200).json({token,status:"success"});
  }catch(error){
      return res.status(500).json({error:error.message});
  }
});


export default Router;