//Libraries
import express from "express";
import passport from "passport";

//database Model
import {FoodModel} from "../../database/allModels";

const Router = express.Router();


/*
route           /
description      get all restaurant details based on city
Params           none
Access           public
Method           get
*/

Router.get("/",async (req,res)=>