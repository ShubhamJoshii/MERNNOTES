import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./NotesLogo.png";
const Header = () => {
  const [userName, setUserName] = useState("UN");
  const [logoutBtn, setLogoutbtn] = useState(true);
  const userLoginCheck = async () => {
    try {
      const res = await fetch("/home", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(),
      });
      const Data = await res.json();
      // alert(Data.name);
      const x = userDP(Data.name);
      setUserName(x);
      setLogoutbtn(false);
    } catch (err) {
      console.log(err);
      setLogoutbtn(true);
    }
  };

  const LogoutUser = async () => {
    try {
      const res = await fetch("/logout", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const Data = await res.json()
      alert(Data.message)
      setLogoutbtn(true)
    } catch (err) {
      console.log(err);
      setLogoutbtn(false)
    }
  };

  const userDP = (name) => {
    const x = name
      .split(" ")
      .map((x) => x[0])
      .join("");
    return x;
  };

  useEffect(() => {
    userLoginCheck();
  }, []);

  const navigate = useNavigate();
  // navigate = useNavigate();
  return (
    <div className="header">
      <img src={logo} alt="NotesLogo" width="50px" />
      <h1>... Shubham Joshi Notes ...</h1>
      <div className="userDP">
        {userName}
        <div className="userHover">
          {logoutBtn === true ? (
            <p
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </p>
          ) : (
            <p onClick={LogoutUser}>Logout</p>
          )}
          <p
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </p>
          {/* <p onClick={()=>{navigate("/login")}}>Login</p> */}
          <p
            onClick={() => {
              navigate("/register");
            }}
          >
            Register
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
