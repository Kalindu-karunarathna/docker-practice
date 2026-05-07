import express from "express";
import mongoose from "mongoose";
import User from "./users.js";
import cors from "cors"

const app = express();
app.use(express.json());
app.use(cors());

//connect to mongodb
mongoose.connect("mongodb://localhost:27017/yourDB",).then(()=>{
    console.log("connected to mongodb")
}).catch((err)=>{
    console.log("failed to connect to mongodb",err)
})


//api routes for create user 
app.post("/api/users",async (req,res)=>{
    try{
        const user = new User(req.body);
        const result = await user.save();
        res.status(201).json({message:"user created successfully", data:result});
    }catch(error){
        res.status(500).json(error);
    }
});

//api routes for get all users
app.get("/api/users",async (req,res)=>{
    try{
        const users =  await User.find();
        res.status(200).json({message:"user data fetched successfully",data:users});

    }catch(err){
        res.status(500).json({error:"internal server error "+error});
    }
})

//listen to port 
app.listen(5000,()=>{
    console.log("server is running on port 3000");
});
