import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(cors());

//connect to mongodb
mongoose.connect("mongodb://localhost:27017/yourDB",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connected to mongodb")
}).catch((err)=>{
    console.log("failed to connect to mongodb",err)
})
