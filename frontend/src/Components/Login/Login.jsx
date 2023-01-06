import React,{useState,useEffect} from "react";
import "./Login.css";
import TopIMG from "../img/Img.png";
import {useNavigate} from "react-router-dom"

import {FaLock,FaEye,FaEyeSlash} from "react-icons/fa";
import { SiGmail} from "react-icons/si";


function Login() {
  const [userInput, setUserInput] = useState({
    email:"",password:""
  })
  const [show,setShow] = useState(true)
  const navigate = useNavigate();
  const handleLoginInput = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setUserInput({...userInput,[name]:value});
  }

  const handleLoginSave = async(e)=>{
    e.preventDefault()
    const {email, password} = userInput;
    if(password.length >= 8){
      document.getElementsByClassName("inputPassword")[0].style.backgroundColor="#00a4b36b"
      document.getElementsByClassName("inputForm")[0].style.backgroundColor="#00a4b36b"
      try{
        const res = await fetch("/login",{
          "headers":{
            "Content-Type":"application/json",
          },
          "method":"POST",
          "body":JSON.stringify({email,password})
        })
        const Data = await res.json();
        alert(Data.message)
        if(Data.message === "User Login"){
          navigate("/")
          window.location.reload()
        }
      } catch(err){
        document.getElementsByClassName("inputForm")[0].style.backgroundColor="red"
        alert("User Not Registered")
        console.log(err);
      }
    }
    else{
      document.getElementsByClassName("inputPassword")[0].style.backgroundColor="red"
      alert("Invalid Password")
    }
  }

useEffect(()=>{
  console.log(userInput);
},[userInput])

const passwordShow = ()=>{
  let a = document.getElementById("password");
  setShow(!show);
  a.type === "password" ? a.type="text" :a.type="password"
}
  return (
    <div className="Login">
      <img src={TopIMG} alt="" width="350px" />
      <div id="textLogin">User Login</div>
      <form action="" method="POST">
        <div className="inputForm">
          <SiGmail />
          <input type="text" placeholder="Email or Username" name="email" onChange={handleLoginInput} />
        </div>
        <div className="inputForm inputPassword">
          <FaLock />
          <input type="password" placeholder="Password" id="password" name="password" onChange={handleLoginInput} />
          {show === true ? <FaEyeSlash onClick={passwordShow} /> : <FaEye onClick={passwordShow} />}
        </div>
        <input type="submit" value="Login" id="loginBtn" onClick={handleLoginSave}/>
      </form>
      <p onClick={()=>{navigate("/register")}}>Create Account ?</p>
    </div>
  );
}

export default Login;
