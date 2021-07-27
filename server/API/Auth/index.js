//Library
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Models
import { UserModel } from "../../database/user";


const Router = express.Router();

/*
route /signup
description  Signup with email and password
Params  none
Access  public
Method  post
*/
Router.post("/signup",async(req,res)=>{
  try{
    const {email,password,fullname,phoneNumber} = req.body.credentials;

    //check whether email exist
    const checkUserByEmail = await UserModel.findOne({email});  //here key nd value both are email
    const checkUserByPhone = await UserModel.findOne({phoneNumber}); 

    if(checkUserByEmail || checkUserByPhone){
        return res.json({error:"User already exist"});
    }
    //hash the password  encrryption of password
    const bcryptSalt = await brcrypt.genSalt(8);

    const hashedPassword = await bcrypt.hash(password,bcryptSalt);

    //save to database
    await UserModel.create(
      {
        ...req.body.credentials,
        password:hashedPassword,
      }
    );
    //generate JWT auth token
     const token= jwt.sign({user:{fullname,email} }, "ZomatoApp");


    //return
    return res.status(200).json({token,status:"success"});
  }catch(error){
      return res.status(500).json({error:error.message});
  }
});


export default Router;