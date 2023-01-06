import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Notfound.css"
function Notfound() {
    let navigate = useNavigate();
    return (
    <div className='NotFound'>
    <h1>WE ARE SORRY, PAGE NOT FOUND!</h1>
    <p>THE PAGE YOU ARE LOOKING FOR MIGHT HAVE BEEN REMOVED OR HAD ITS NAME CHANGE OR IS TEMPORARILY UNAVAILABLE</p>
    <button  id="formBtn" onClick={()=>{
        navigate("/")
    }}>BACK TO HOMEPAGE</button>
    </div>
)
}

export default Notfound

