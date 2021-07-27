//importing dotenv variables
require("dotenv").config();

//Libraries
import express from "express";
import cors from "cors";
import helmet from "helmet";


//microservices routes
import Auth from "./API/Auth";

//databse connection
import ConnectionDB from "./database/connection";
const zomato=express();

//application middlewares
zomato.use(express.json());
zomato.use(express.urlencoded({extended:false}));
zomato.use(helmet());
zomato.use(cors());

//Application Route
zomato.use("/auth",Auth);

zomato.get("/",(req,res)=> res.json({message:"setup success"}));

//zomato.listen(4000,()=> console.log("server is running"));
zomato.listen(4000,()=>
ConnectionDB().then(()=> console.log("Server running"))
.catch(()=>console.log("server running but database connection failed"))
);