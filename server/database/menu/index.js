import mongoose from "mongoose";


const MenuSchema = new  mongoose.Schema(
    {
        menus:[
            {
                name:{type:String,required:true},
                items:[
                    {
                       type:mongoose.Types.ObjectId,
                       ref:"Foods", 
                    },
                ],
            },
        ],
        recommended:[
            {
                type:mongoose.Types.ObjectId,
                ref:"Foods",
                unique:true, // same food shouldnt be recommended again nd again should be unique  
            },
        ],
    }
);

export const MenuModel=  mongoose.model("Menu",MenuSchema);