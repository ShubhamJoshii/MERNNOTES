const NotesWeb = require("./database");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "SHUBHAMJOSHIISGOODBOYQWERTYUIOP"
const Authenication = async (req,res,next)=>{
    try{
        const token = req.cookies.Notestoken;
        const verifyToken = jwt.verify(token,SECRET_KEY)
        // console.log(verifyToken);
        const rootUser = await NotesWeb.findOne({_id:verifyToken._id,"tokens.token":token})
        // console.log(rootUser);
        if(!rootUser){
            throw new Error("User Not Found");
        }
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id; 
        next();
    } catch(err){
        res.status(401).send("Unauthorized:No token provided")
        console.log(err,"Authenication Error")
    }
}

module.exports = Authenication;