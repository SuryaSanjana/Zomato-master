//importing dotenv variables
require("dotenv").config();

//Libraries
import express from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";

// configs
import googleAuthConfig from "./config/google.config";

//microservices routes
import Auth from "./API/Auth";
import Restaurant from "./API/Restaurant";

//databse connection
import ConnectionDB from "./database/connection";
const zomato=express();

//application middlewares
zomato.use(express.json());
zomato.use(express.urlencoded({extended:false}));
zomato.use(helmet());
zomato.use(cors());
zomato.use(passport.initialize());
zomato.use(passport.session());

//passport configuration
googleAuthConfig(passport);

//Application Route
zomato.use("/auth",Auth);
zomato.use("/restaurant",Restaurant);



zomato.get("/",(req,res)=> res.json({message:"setup success"}));

//zomato.listen(4000,()=> console.log("server is running"));
zomato.listen(4000,()=>
ConnectionDB().then(()=> console.log("Server running"))
.catch(()=>console.log("server running but database connection failed"))
);