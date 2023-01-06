const express = require('express');
const mongoose = require('mongoose');
const path = require("path")
const cookieParser = require("cookie-parser")
const App = express();

const port = 8000;

// for taking existing Cookies from Frontend
App.use(cookieParser())
App.use(express.json());

App.use(require("./auth.js"))
const NotesWeb = require("./database")

App.get("/",(req,res)=>{
  // console.log(path.resolve(__dirname,"client","build"))
  App.use(express.static(path.resolve(__dirname,"frontend","build")));
  res.status(200).sendFile(path.resolve(__dirname,"frontend","build"));  
})


App.listen(port,()=>{
  console.log(`Express Connection Successfull at Port ${port}`)
})