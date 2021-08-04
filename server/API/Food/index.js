//Libraries
import express from "express";
import passport from "passport";

//database Model
import {FoodModel} from "../../database/allModels";

const Router = express.Router();


/*
route           /r
description      get all food details based on restaurant
Params            id
Access           public
Method           get
*/

Router.get("/r/:_id",async (req,res)=>{
  try{
    const {_id} = req.params;
    const foods=await FoodModel.find({restaurant:_id});
    return res.json({foods});
  }catch (error) {
      return res.status(500).json({error:error.message});
  }
});



/*
route           /c
description      get all food details based on restaurant
Params            catogory
Access           public
Method           get
*/


Router.get("/r/:category",async (req,res)=>{
    try{
      const {category} = req.params;
      const foods=await FoodModel.find(
        {
            category : {$regex:category , options:"i"},
        });
      return res.json({foods});
    }catch (error) {
        return res.status(500).json({error:error.message});
    }
});

export default Router;