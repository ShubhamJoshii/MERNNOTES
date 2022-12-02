// import Express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import { MOGOURI } from "./config/keys";

const Express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const {MongoDB,ports} = require('./config/keys');

const App = Express();

App.use(Express.json())
App.use(Express.urlencoded())
App.use(cors())

const DB = MongoDB;

// mongoose.connect("mongodb://localhost:27017/NotesMaker").then(()=>{
//   console.log("Data Base Connected")
// })

mongoose.connect(DB,{
  useNewUrlParser: true,
  useUnifiedTopology : true,
  // useCreateIndex : true,
  // useFindAndModify  : false
}).then(()=>{
  console.log("Data Base Connected")
})

const NotesSchema = new mongoose.Schema({
  Topic : {
    type : String
  },
  Notes : {
    type : String
  }
})

const NotesWeb = new mongoose.model("NotesWeb",NotesSchema);


App.get("/dataDisplay",async (req,res)=>{
  const AllData = await NotesWeb.find();
  res.send(AllData)
})

App.post("/input",async (req,res)=>{
  // console.log(req.body);
  const {Topic, Notes} = req.body;
  if (Topic || Notes){
    const Data =await NotesWeb.insertMany([{Topic,Notes}]);
    res.send({message:"Notes Created"})
    console.log(Data);
  }
  else{
    res.send({message:"Notes will be not Empty"})
  }
})

App.post("/deleteData",async (req,res) => {
  console.log(req.body)
  const data = await NotesWeb.deleteMany(req.body);
  console.log(data);
})

App.post("/display",async (req,res)=>{
  const AllData = await NotesWeb.find();
  res.send({message : AllData})
})

const port = ports;

if(process.env.NODE_ENV == "production"){
    const path = require("path");
    App.get("/",(req,res)=>{
        App.use(Express.static(path.resolve(__dirname,"frontend/build")));
        res.sendFile(path.resolve(__dirname,"frontend/build"));
    })
}

App.get("/home",(req,res)=>{
  res.send("Page Found");
})

App.get("*",(req,res)=>{
  res.send("Page Not Found");
})

App.listen(port,()=>{
  console.log(`Express Connection Successfull at Port ${port}`)
})