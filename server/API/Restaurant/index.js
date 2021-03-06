//Libraries
import express from "express";
import passport from "passport";

//database Model
import {RestaurantModel} from "../../database/allModels";

//validation
import { ValidateRestaurantCity, ValidateRestaurantSearchString } from "../../validation/restaurant";

import { ValidateRestaurantId } from "../../validation/food";

const Router = express.Router();

/*
route           /
description      get all restaurant details based on city
Params           none
Access           public
Method           get
*/

Router.get("/",async (req,res)=>{
  try{
    //validation
    await ValidateRestaurantCity(req.query);


    const {city} =req.query;
    const restaurants=await RestaurantModel.find({city }); //find method used but not findOne coz we need all restaurants
    return res.json({restaurants});
  }catch (error) {
    return res.status(500).json({error:error.message});
  }
});



/*
route           /
description      get individual restaurant details based on id
Params           id
Access           public
Method           get
*/
Router.get("/:_id", async (req,res)=>{
  try{
    //validation
    await ValidateRestaurantId(req.params);


    const {_id} = req.params;
    const restaurant = await RestaurantModel.findById(_id);
    if(!restaurant){
        return res.status(404).json({error:"Restaurant not found"}); 
    }
   return res.json({restaurant});
  }catch (error) {
    return res.status(500).json({error:error.message});
  }
});



/*
route           /search
description      get  restaurant details based on search
Params           none
body             searchString
Access           public
Method           get
*/

Router.get("/search",async (req,res)=>{
 try{
   //validation
   
   await ValidateRestaurantSearchString(req.body);


  const {searchString} = req.body;
  const restaurants = await RestaurantModel.find(
    {
      name:{$regex:searchString,$options:"i"},  // searching by name
                                                //i ->case insensitive  
    }
  );
 if(!restarants) return res.status(404).json({error:`No restaurant matched with ${searchString}`}); 
 return res.json({restaurants});
}catch (error) {
  return res.status(500).json({error:error.message});
}
});

// @Route   POST /restaurants/new
// @des     add new restaurant
// @access  PRIVATE
Router.post("/new", passport.authenticate("jwt"), async (req, res) => {
  try {
    const newRetaurant = await RestaurantModel.create(req.body.retaurantData);
    return res.json({ restaurants: newRetaurant });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// @Route   PATCH /restaurants/update
// @des     update exisitng restaurant data
// @access  PRIVATE
Router.patch("/update", passport.authenticate("jwt"), async (req, res) => {
  try {
    const updatedRestaurant = await RestaurantModel.findByIdAndUpdate(
      req.body.retaurantData._id,
      { $set: req.body.retaurantData },
      { new: true }
    );
    if (!updatedRestaurant)
      return res.status(404).json({ restaurants: "Restaurant Not Found!!!" });

    return res.json({ restaurants: updatedRestaurant });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});


// @Route   DELETE /restaurants/delete
// @des     update exisitng restaurant data
// @access  PRIVATE
Router.delete("/delete", passport.authenticate("jwt"), async (req, res) => {
  try {
    const deleteRestaurant = await RestaurantModel.findByIdAndRemove(
      req.body.retaurantData._id
    );
    return res.json({ restaurants: Boolean(deleteRestaurant) });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;