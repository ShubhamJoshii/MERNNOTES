const express =require("express")
const router = express.Router();
const NotesWeb = require("./database")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Authenication = require("./Authenication")

router.post("/home",Authenication,(req,res)=>{
    // console.log(req.rootUser)
    res.send(req.rootUser)
})

router.post("/SaveNotes",Authenication,async(req,res)=>{
    const {Title, Notes} = req.body;
    console.log(Title,Notes)
    try{
        const userupdate = await NotesWeb.findOne({_id:req.userID})
        if(userupdate){
            const notesAdder = await userupdate.addMessage(Title,Notes)
            await userupdate.save()
            res.send({message:"Notes Added"})
        }
    }catch(err){
        console.log(err);
    }
})

router.post("/fetchNotes",Authenication,(req,res)=>{
    // console.log(req.rootUser.Notes)
    res.send({Notes:req.rootUser.Notes,_id:req.userID})
})

router.post("/login",async(req,res)=>{
    const {email, password} =req.body
    // console.log(req.body)
    try{
        const userExist = await NotesWeb.findOne({email});
        const passwordCompare = bcrypt.compare(password,userExist.password)
        const token = await userExist.generateAuthToken();
        console.log(token)
        res.cookie("Notestoken",token,{
            expires: new Date(Date.now() + 25892000000),
            httpOnly:true
        })
        if(passwordCompare){
            res.send({message:"User Login"})
        }else{
            res.send({message:"User Password Invaild"})
        }
    } catch(err){
        console.log(err)
        res.send({message:"User Not Exists"})
    }  
})

router.get("/logout", (req, res) => {
    res.clearCookie("Notestoken", { path: "/" });
    res.status(200).send({message:"User Logout"});
  });

router.post("/register",async(req,res)=>{
    const {name,email,phone,password,Cpassword} =req.body;
    try{
        const userExist = await NotesWeb.findOne({email})
        if(!userExist){
            // console.log(name,email,phone,password,Cpassword)
            const user = await new NotesWeb({name,email,phone,password,Cpassword})
            await user.save()
            res.send({message:"User Registered"})
        }else{
            console.log("userExist")
            res.send({message:"User Already Exist"})
        }
    }catch(err){
        console.log(err);
    }
})

module.exports = router;