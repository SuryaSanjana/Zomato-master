import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
    {
        fullname:{type:String, required:true},
        email:{type:String, required:true},
        password:{type:String},
        address:[{detail:{type:String},for:{type:String}}],
        phoneNumber:[{type:Number}],  
    },
    {
        timestamps:true,
    }
    );

    UserSchema.methods.generateJwtToken = function () {
      return jwt.sign({user : this._id.toString() },  "ZomatoApp");
    };

UserSchema.statics.findByEmailAndPhone = async ({email,phoneNumber})=>{
       //check whether email exist
     const checkUserByEmail = await UserModel.findOne({email});  //here key nd value both are email
      const checkUserByPhone = await UserModel.findOne({phoneNumber}); 
     if(checkUserByEmail || checkUserByPhone){
        throw new Error("user already exist");
     }
     return false;  //false coz user doesnt exist
    };

    UserSchema.pre("save",function (next) {
      const user = this; //user data is reffered as `this` .it is assigned to a const just for simplicity
      //check if password modified
      if(!user.isModified("password"))  return next();
      //generate bcrypt salt
      bcrypt.genSalt(8, (error,salt)=>{
          if(error) return next(error);

          //hash password
          bcrypt.hash(user.password,salt, (error,hash)=>{
              if(error) return next(error);
              
              user.password = hash;
              return next();
          });
      });
    });

export const UserModel=mongoose.model("Users",UserSchema)  // .model("collection",model)