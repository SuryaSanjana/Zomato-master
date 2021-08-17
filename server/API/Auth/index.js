//Library
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "passport";

//Models
import { UserModel } from "../../database/user";

//validation
import { ValidateSignup,ValidateSignin } from "../../validation/auth";

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
    //validation
    await ValidateSignup(req.body.credentials);



   // const {email,password,fullname,phoneNumber} = req.body.credentials;

    // //check whether email exist
    // const checkUserByEmail = await UserModel.findOne({email});  //here key nd value both are email
    // const checkUserByPhone = await UserModel.findOne({phoneNumber}); 
    

    // if(checkUserByEmail || checkUserByPhone){
    //     return res.json({error:"User already exist"});
    // }
    await UserModel.findByEmailAndPhone(req.body.credentials);

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


/*
route              /signin
description       sign in by email and password
Params            none
Access           public
Method           post
*/
Router.post("/signin",async(req,res)=>{
  try{
    //validation
    await ValidateSignin(req.body.credentials);


    const user = await UserModel.findByEmailAndPassword(req.body.credentials);
   const token = user.generateJwtToken();
  
    //return
    return res.status(200).json({token,status:"success"});
  }catch(error){
    return res.status(500).json({error:error.message});
  }
});



/*
route              /google
description       google signin
Params            none
Access           public
Method           get
*/

Router.get("/google",passport.authenticate("google",
  {
    scope:[
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
);



/*
route              /google/callback
description       google signin callback
Params            none
Access           public
Method           get
*/
Router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    return res.json({ token: req.session.passport.user.token });
  }
);

export default Router;