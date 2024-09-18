import React, { useState } from "react";
import "./../../App.css";
import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../../utils";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/slices/userSlice";

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch =useDispatch();
  const adduser=(token,user,role,id)=>{
    console.log('adduser called');
    setTimeout(() => {
      navigate("/");
    }, 1000);

    dispatch(addUser({
       id:id,
       role:role,
       name:user,
       jwt:token
       })) 
  }
  const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;

            if (!email || !password) {
              console.log("hello", email, password);
              return handleError("All fields are mandetory to fill");
            }

            try {
              const url = "http://localhost:4040/user/login";
              const response = await fetch(url, {
                method: "POST",
                headers: {
                  "content-Type": "application/json",
                },
                body: JSON.stringify(loginInfo),
              });
              const result = await response.json();
              const { success, token, email, message, user,role,id} = result;
              console.log("result",result);
              
              if (result.status==200) {
                handleSuccess(message);
                adduser(token,user,role,id);
                // dispatch(userRole({userRole:role,jwt:token,usr:user}))
                localStorage.setItem("token", token);
                localStorage.setItem("user", user);
                localStorage.setItem("role",role);  
                localStorage.setItem("userId",id)

                console.log(role);
                
                
                        // if(role==='admin')
                        // {
                        //   setTimeout(() => {
                        //     navigate("/advance-user/p/admin");
                        //   }, 1000);
                          
                        // }else{
                          setTimeout(() => {
                            navigate("/");
                          }, 1000);
                        // }
                
              } else {
                handleError(result.message);
              }
              // console.log(result);
              console.log(result);
            } catch (error) {
              handleError(error);
            }
  }

  const handleChange = (e) => {
                                const { name, value } = e.target;
                                console.log(name, value);
                                const copyLogiInfo = { ...loginInfo };
                                copyLogiInfo[name] = value;
                                setLoginInfo(copyLogiInfo);
                              };

  // console.log("LogiInfo- >", loginInfo);

  return (
    <>
      <div className="loginForm">
        <form onSubmit={handleSubmit}>
          <center>
            <h2>
              <b>Login</b>
            </h2>
          </center>

          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="enter email id"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="enter password"
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary mr-10" id="log-btn">
            Submit{" "}
          </button>
          <Link to="/signup">Signup/Create Account</Link>
        </form>
        <ToastContainer />
      </div>
    </>
  );
}

export default Login;
