const mongoose = require('mongoose');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const SECRET_KEY = "SHUBHAMJOSHIISGOODBOYQWERTYUIOP"
MongoDB = "mongodb+srv://NotesMaker:x6svuFpCUQA4KevZ@cluster0.abizmm9.mongodb.net/?retryWrites=true&w=majority"
const DB = MongoDB;
mongoose.connect(DB,{
    useNewUrlParser: true,
    useUnifiedTopology : true,
  }).then(()=>{
    console.log("Data Base Connected")
  })
  
  const NotesSchema = new mongoose.Schema({
    name:{
      type:String,
      require:true
    },
    email:{
      type:String,
      require:true
    },
    phone:{
      type:Number,
      require:true
    },
    password:{
      type:String,
      require:true
    },
    Cpassword:{
      type:String,
      require:true
    },
    RegisterDate:{
      type:Date,
      default:Date.now()
    },
    Notes:[{
        Title : {
          type : String,
          require:true
        },
        Notes : {
          type : String,
          require:true
        },
        NotesAdded_Date:{
          type:Date,
          default:Date.now()
        }
      }],
      tokens:[
        {
          token:{
            type:String,
            required:true            
          }
        }
      ]
});

NotesSchema.methods.generateAuthToken = async function(){
  try{
    const token = jwt.sign({_id:this._id},SECRET_KEY)
    this.tokens = this.tokens.concat({token:token})
    await this.save()
    return token;
  } catch(err){
    console.log(err)
  }
}

NotesSchema.methods.addMessage = async function(Title,Notes){
  try{  
    this.Notes = this.Notes.concat({Title,Notes,_id:this._id})
    await this.save()
    return this.Notes
  }catch(err){
    console.log(err)
  }
}

NotesSchema.pre("save",async function(next){
  if(this.isModified('password')){
    this.password = await bcrypt.hash(this.password,12)
    this.Cpassword = await bcrypt.hash(this.Cpassword,12)
    // console.log(this.password)
  }
  next();
})
  

const NotesWeb = new mongoose.model("NotesWeb",NotesSchema);



module.exports = NotesWeb;
