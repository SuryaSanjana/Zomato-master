import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
    {
      fullname: { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String },
      address: [{ detail: { type: String }, for: { type: String } }],
      phoneNumber: [{ type: Number }],
    },
    {
      timestamps: true,
    }
  );

  UserSchema.methods.generateJwtToken = function () {
    return jwt.sign({ user: this._id.toString() }, "ZomatoAPP");
  };
  
  UserSchema.statics.findByEmailAndPhone = async ({ email, phoneNumber }) => {
    // check whether email exist
    const checkUserByEmail = await UserModel.findOne({ email });
    const checkUserByPhone = await UserModel.findOne({ phoneNumber });
  
    if (checkUserByEmail || checkUserByPhone) {
      throw new Error("User Already Exist...!");
    }
  
    return false;  //false coz user doesnt exist
  };

//for sign in 
UserSchema.statics.findByEmailAndPassword = async ({email,password}) =>{
    //check whether email exist
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("User does no exist!!!");

    //compare email and password
    const doesPasswordMatch = await bcrypt.compare(password, user.password);

    if (!doesPasswordMatch) throw new Error("invalid Password!!!");
  
    return user;
};

UserSchema.pre("save",function (next) {
      const user = this; //user data is reffered as `this` .it is assigned to a const just for simplicity
      //check if password modified
      if (!user.isModified("password")) return next();
      // generate bcrypt salt
  bcrypt.genSalt(8, (error, salt) => {
    if (error) return next(error);

    // hash the password
    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) return next(error);

      // assigning hashed password
      user.password = hash;
      return next();
    });
  });
});
export const UserModel=mongoose.model("Users",UserSchema)  // .model("collection",model)