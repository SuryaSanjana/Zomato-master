//Libraries
import express from "express";
import passport from "passport";

//Database Model
import {ImageModel, MenuModel} from "../../database/allModels";

const Router = express.Router();



/*
route           /list 
description      get all  list menu details based on id
Params            id
Access           public
Method           get
*/

Router.get("/list/:_id", async (req,res)=>{
 try{
  const {_id} = req.params;
  const menus = await MenuModel.findOne(_id);
  return res.json({menus});
 }catch (error) {
    return res.status(500).json({error:error.message});
 }
});



/*
route           /image
description      get all   menu images based on id
Params            id
Access           public
Method           get
*/

Router.get("/image/:_id",async (req,res)=>{
    try{
        const {_id} = req.params;
        const menus = await ImageModel.findOne(_id);
        return res.json({menus});
    }catch (error) {
     return res.status(500).json({error:error.message});
    }
});

export default Router;