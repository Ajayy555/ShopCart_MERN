import React, { useEffect, useState } from "react";
import "./../../../App.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { handleError, handleSuccess } from "../../../utils";
import { ToastContainer } from "react-toastify";
import axios from "axios";

function UpdateUser() {
  const [userData, setuserData] = useState({
    name: "",
    dob: "",
    mobile: "",
    email: "",
  });
  const { userId } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const formatDate = (isoDateString) => {
    // Create a Date object from the ISO string
    const date = new Date(isoDateString);

    // Extract the year, month, and day from the Date object
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");

    // Format to yyyy/mm/dd
    return `${year}-${month}-${day}`;
  };
  console.log(userData);
  
  const headers = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };

  const fetchUserDetails = async () => {
    try {
      const url = `http://localhost:4040/user/singleUser/${userId}`;
      
      const response = await axios.get(url,headers);

      const isoDateString = response.data.response.dob;
      const formattedDate = formatDate(isoDateString);
      console.log(formattedDate);

      setuserData({
        name: response.data.response.name,
        dob: formattedDate,
        mobile: response.data.response.mobile,
        email: response.data.response.email,
      });
    } catch (error) {
      console.log(error);
      if (
        error.response.data.status == 401 ||
        error.response.data.status == 501
      ) {
        handleError("UnAuthorized Error..!");
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    }
  };

  useEffect(() => {
    fetchUserDetails();
    // console.log('use effect run');
    
  }, []);

  const onSubmit = async (data) => {
    // console.log("data before sent",userData);

    try {
      console.log(typeof userId);

      const url = `http://localhost:4040/user/editUser/${userId}`;

      const response = await axios.patch(url,userData,headers);
        if(response){
            
            handleSuccess('user updated successfully..!')
            setTimeout(() => {
                navigate("/admin/users");
              }, 1000);
      console.log("rr",response);
      
    }
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {

    const { name, value } = e.target;
                                console.log(name, value);
                                const copyLogiInfo = { ...userData };
                                copyLogiInfo[name] = value;
                                setuserData(copyLogiInfo);
    // setuserData({name:e.target.value})
    // console.log(e.target.value);
    
  };

  return (
    <>
      <div className="loginForm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <center>
            <h2>
              <b>Edit / Update user Record</b>
            </h2>
            <h3>user Id {userId}</h3>
          </center>
          <div className="mb-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              name="name"
              onChange={handleChange}
              value={userData.name}
            //   placeholder="enter user name"
            //   {...register("name", {
            //     //   required: "username required",
            //     minLength: {
            //       value: 4,
            //       message: "username must have at least 4 characters",
            //     },
            //   })}
            />
            {/* <span className="validationAlert">
              {errors.name && <p>{errors.name.message}</p>}
            </span> */}
          </div>

          <div className="mb-3">
            <label>Date Of Birth</label>
            <input
              type="date"
              className="form-control"
              name="dob"
              onChange={handleChange}
              value={userData.dob}
              min="1999-01-01"
              //   {...register("dob",{
              //       required:"dob is required"
              //   })}
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
              value={userData.mobile}
              onChange={handleChange}
              placeholder="enter mobile number"
            //   {...register("mobile", {
            //     //   required: "mobile number is required",
            //     pattern: {
            //       value: /^[0-9]{10}$/,
            //       message: "mobile number must be 10 digit",
            //     },
            //   })}
            />

            <span className="validationAlert">
              {errors.mobile && <p>{errors.mobile.message}</p>}
            </span>
          </div>

          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={userData.email}
              onChange={handleChange}
              placeholder="enter email id"
            //   {...register("email", {
            //     //   required:"email is required",
            //     pattern: {
            //       value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            //       message: "Invalid email address",
            //     },
            //   })}
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
              {...register("password", {
                //   required:"password is required",
                minLength: {
                  value: "8",
                  message: "Strong password recommended must be 8 digit",
                },
                pattern: {
                  value: /[!@#$%^&*:;.,]/,
                  message:
                    "pls create strong password must have special character",
                },
              })}
            />
            <span className="validationAlert">
              {errors.password && <p>{errors.password.message}</p>}
            </span>
          </div>

          <div className="mb-3 form-check"></div>
          <button type="submit" className="btn btn-primary" id="log-btn">
            Edit
          </button>
        </form>
        <ToastContainer />
      </div>
    </>
  );
}

export default UpdateUser;
