//Libraries
import  mongoose from "mongoose";
import passport from "passport";

//database model
import { userModel, UserModel } from "../../database/allModels";

const Router = express.Router();

/**
 Route   /:_id
 des   get user data
 params  _id
 body   
 access
 method

*/

Router.get("/:_id", async (req,res)=>{
    try{
      const {_id} =req.params;
      const getUser = await UserModel.findById(_id);
      return res.json({user:getUser});
    }catch(error) {
        return res.status(500).json({error:error.message});
    }
});

/*
*/

Router.put("/update/:userId", async(req,res)=>{
    try{
      const {UserId} = req.params;
      const {userData} = req.body;
      const UpdateUsseerData = await userModel.findByIdAndUpdate(
          UserId,
          
      )
    }catch(error){
        return res.status(500).json({error:error.message});
    }
});

export default Router;
