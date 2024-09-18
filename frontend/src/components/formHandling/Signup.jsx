import React, { useState } from "react";
import "./../../App.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { handleError, handleSuccess } from "../../utils";
import { ToastContainer } from "react-toastify";

function Signup() {
  const navigate=useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit =async (data) => {
      // console.log(data);

      const url="http://localhost:4040/user/addUser";
      const response=await fetch(url,{
        method:"POST",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify(data)
      });

      const result=await response.json();
      const { success, message} = result;

      if (result.success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        handleError(result.message);
      }
      console.log(result);
      
    reset();
  }

  return (
    <>
    
    

    <div className="loginForm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <center>
          <h2>
            <b>Signup</b>
          </h2>
        </center>
        <div className="mb-3">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="enter user name"
                {...register("name", {
                  required: "username required",
                  minLength: {
                    value: 4,
                    message: "username must have at least 4 characters",
                  },
                })}
          />
                        <span className="validationAlert">
                          {errors.name && <p>{errors.name.message}</p>}
                        </span>
        </div>

        <div className="mb-3">
          <label>Date Of Birth</label>
          <input
            type="date"
            className="form-control"
            name="dob"
            min="1999-01-01"
                  {...register("dob",{
                      required:"dob is required"
                  })}
          />
                          <span className="validationAlert">
                            {errors.dob && <p>{errors.dob.message}</p>}
                          </span>
        </div>
        <div className="mb-3">
          <label>Mobile Number</label>
          <input
            type="tel"
            className="form-control"
            name="mobile"
            placeholder="enter mobile number"
                    {...register("mobile", {
                      required: "mobile number is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "mobile number must be 10 digit",
                      },
                    })}
          />

                            <span className="validationAlert">
                              {errors.mobile && <p>{errors.mobile.message}</p>}
                            </span>
        </div>

        <div className="mb-3">
          <label >Email address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="enter email id"
                      {...register("email",{
                          required:"email is required",
                          pattern:{
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email address"
                          }
                      })}
          />
                                  <span className="validationAlert">
                                    {errors.email && <p>{errors.email.message}</p>}
                                  </span>
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="enter password"
                             {...register("password",{
                              required:"password is required",
                              pattern:{
                                  value:/[!@#$%^&*:;.,]/,
                                  message:"pls create strong password"
                              }
                             })}
          />
                                        <span className="validationAlert">
                                          {errors.password && <p>{errors.password.message}</p>}
                                        </span>
        </div>

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="t&c"
                             {...register("tnc",{
                                  required:"pls read term & conditions"
                             })}
          />
          <label className="form-check-label" >
            T & C
          </label>
          <span className="validationAlert">
                                          {errors.tnc && <p>{errors.tnc.message}</p>}
                                        </span>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          id="log-btn"
        
        >
          Submit
        </button>
        <Link to="/login">Login</Link>
      </form>
      <ToastContainer/>
    </div>
    </>
  );
}

export default Signup;
