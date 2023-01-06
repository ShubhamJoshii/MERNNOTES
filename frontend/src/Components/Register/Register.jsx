import React,{useState,useEffect} from 'react'
import "./Register.css"
import TopIMG from "../img/Img.png";
import {useNavigate} from "react-router-dom";
import {FaUserAlt,FaLock,FaEye,FaEyeSlash,FaPhoneAlt} from "react-icons/fa";
import { SiGmail} from "react-icons/si";
function Register() {
  const [passwordShow,setPasswordShow] = useState(true)
  const [CpasswordShow,setCPasswordShow] = useState(true)
  const [registerData ,setRegisterData] = useState({
    name:"",email:"",phone:"",password:"",Cpassword:""
  })
  const navigate = useNavigate();
  
  const handleInputRegister = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setRegisterData({...registerData,[name]:value});
  }
  
  useEffect(()=>{
    console.log(registerData)
  },[registerData])
  
  const handleRegister = async(e)=>{
    e.preventDefault();
    const {name,email,phone,password,Cpassword} = registerData;
    if(!name || !email || !password || !phone || !Cpassword || password.length < 8 || Cpassword.length < 8){
      document.getElementsByClassName("inputPassword")[0].style.backgroundColor="red";
      document.getElementsByClassName("inputPassword")[1].style.backgroundColor="red";
      alert("Fill Form Properly")
    }
    else if(!(password === Cpassword)){
      document.getElementsByClassName("inputPassword")[0].style.backgroundColor="red";
      document.getElementsByClassName("inputPassword")[1].style.backgroundColor="red";
      alert("Invaild Password");
    }
    else{
      document.getElementsByClassName("inputPassword")[0].style.backgroundColor="#00a4b36b";
      document.getElementsByClassName("inputPassword")[1].style.backgroundColor="#00a4b36b";
      console.log(registerData);
      try{
        const res = await fetch("/register",{
          "method":"POST",
          "headers":{
            "Content-Type":"application/json"
          },
          "body":JSON.stringify({name,email,phone,password,Cpassword})
        })
        const data = await res.json();
        alert(data.message)
        if(data.message === "User Registered"){
          navigate("/login")
        }
      } catch(err){
        console.log(err)
      }
    }
  }

  const passwordShowbtn = ()=>{
    let a = document.getElementById("password");
    setPasswordShow(!passwordShow)
    a.type === "password" ? a.type="text" :a.type="password"
  }

  const ConfirmpasswordShow = ()=>{
    let a = document.getElementById("Confirmpassword");
    setCPasswordShow(!CpasswordShow)
    a.type === "password" ? a.type="text" :a.type="password"

  }
  
  return (
    <div className="Register">
      <img src={TopIMG} alt="" width="450px" height="250px"  id='userLogo'/>
      <div id="textLogin">User Register</div>
      <form action="">
        <div className="registerForm">
          <FaUserAlt />
          <input type="text" placeholder="Enter Name" name='name' onChange={handleInputRegister}/>
        </div>
        <div className="registerForm">
          <SiGmail />
          <input type="text" placeholder="Email ID" name='email'  onChange={handleInputRegister}/>
        </div>
        <div className="registerForm">
          <FaPhoneAlt />
          <input type="text" placeholder="Phone Number" name='phone' onChange={handleInputRegister}/>
        </div>
        <div className="registerForm inputPassword">
          <FaLock />
          <input type="password" placeholder="Password" id='password' name='password' onChange={handleInputRegister}/>
          {passwordShow === true ? <FaEyeSlash onClick={passwordShowbtn}/> : <FaEye onClick={passwordShowbtn}/>}
        </div>
        <div className="registerForm inputPassword">
          <FaLock />
          <input type="password" placeholder="Confirm Password" id='Confirmpassword' name='Cpassword' onChange={handleInputRegister}/>
          {CpasswordShow === true ? <FaEyeSlash onClick={ConfirmpasswordShow}/> : <FaEye onClick={ConfirmpasswordShow}/>}
        </div>
        <input type="submit" value="Register" id="loginBtn" onClick={handleRegister}/>
      </form>
      <p onClick={()=>{navigate("/login")}}>Login</p>
    </div>
  )
}

export default Register;