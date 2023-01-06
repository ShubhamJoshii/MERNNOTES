const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser")
const App = express();

const port = 8000;

// for taking existing Cookies from Frontend
App.use(cookieParser())
App.use(express.json());



App.use(require("./auth.js"))


const NotesWeb = require("./database")

App.listen(port,()=>{
  console.log(`Express Connection Successfull at Port ${port}`)
})