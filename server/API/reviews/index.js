//Libraries
import  mongoose from "mongoose";
import passport from "passport";

//database model
import { ReviewModel } from "../../database/allModels";

const Router = express.Router();



Router.post("/food/new", async(req,res)=>{
    try{

    }catch(error){
        return res.status(500).json({error:error.message});
    }
});

export default Router;
