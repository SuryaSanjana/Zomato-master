//Libraries
import express from "express";
import passport from "passport";

//database Model
import {FoodModel} from "../../database/allModels";

//validation
import { Validatecategory, ValidateRestaurantId } from "../../validation/food";


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
    //validation
    await ValidateRestaurantId(req.params);


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
      //validation
      await Validatecategory(req.params);


      
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


// @Route   GET /foods/c/:category
// @des     get all foods associated with specified category
// @access  PUBLIC
Router.get("/s/:search", async (req, res) => {
  try {
    const { search } = req.params;
    const allFoods = await FoodModel.find({
      name: { $regex: search, $options: "i" },
    });
    return res.json({ foods: allFoods });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// @Route   POST /foods/new
// @des     add new food record to database
// @access  PRIVATE
Router.post("/new", passport.authenticate("jwt"), async (req, res) => {
  try {
    const { foodData } = req.body;
    const newFood = await FoodModel.create(foodData);
    return res.json({ foods: newFood });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// @Route   PATCH /foods/update
// @des     update exisiitng food data
// @access  PRIVATE
Router.patch("/update", passport.authenticate("jwt"), async (req, res) => {
  try {
    const { foodData } = req.body;
    const updateFood = await FoodModel.findByIdAndUpdate(
      foodData._id,
      {
        $set: foodData,
      },
      { new: true }
    );

    if (!updateFood)
      return res.status(404).json({ foods: "Food record Not Found!!!" });

    return res.json({ foods: updateFood });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// @Route   DELETE /foods/delete
// @des     delete exisiitng food data
// @access  PRIVATE
Router.delete("/delete", passport.authenticate("jwt"), async (req, res) => {
  try {
    const { foodData } = req.body;
    const deleteFood = await FoodModel.findByIdAndRemove(foodData._id);

    return res.json({ foods: Boolean(deleteFood) });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;