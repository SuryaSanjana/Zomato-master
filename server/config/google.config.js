import googleOAuth from "passport-google-oauth20";

import { UserModel } from "../database/allModels";

const GoogleStrategy = googleOAuth.Strategy;


export default (passport) =>{
    passport.use(
        new GoogleStrategy(
            {
              clientID: process.env.GOOGLE_CLIENT_ID,
              clientSecret: process.env.GOOGLE_CLIENT_SECRET,
              callbackURL: "http://localhost:4000/auth/google/callback",
            },
            //since we connect with mongodb we handle promises ,so we use async-await
            // 4 parameters in async are provided by google api. these 4 to be used in order
            //access token is the JWT Token
            async (accessToken, refreshToken, profile, done) => {
           // creating a new user object
        const newUser = {
            fullname: profile.displayName,
            email: profile.emails[0].value,
            profilePic: profile.photos[0].value,
          };
           //checking for user existence
           try{
            const user = await UserModel.findOne({ email: newUser.email });
              
                if(user){
                    const token = user.generateJwtToken();
                   //return user
                   done(null,{user,token}); //null->no data sent back to google ,{user,token}->data send to call backroute
                }else{
                    //create new user
                    const user = await UserModel.create(newUser);
                    const token = user.generateJwtToken();
                   //user doesnt exist , creating user and redirecting to home page
                
                   done(null,{user,token}); // done method called same as above
               }
               
            }catch (error) {
                done(error,null);  //error msg sent and null send to callback route
            }
          }
        )
    );
//to  encode and decode data
passport.serializeUser((userData,done)=> done(null,{...userData }));
passport.deserializeUser((id,done)=> done(null, id));
};