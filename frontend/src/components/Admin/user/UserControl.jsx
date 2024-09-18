
import { ToastContainer } from "react-toastify";
import { handleError } from "../../../utils";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
function UserControl() {
    
  const storedUser = localStorage.getItem("user");
  const [data, setData] = useState();
  const navigate = useNavigate(); 
  const fetchData = async () => {
    try {
      const url = "http://localhost:4040/user/api/u-v/allUsers";
      const headers = {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      };
      const response = await axios(url, headers);
      const result = response;
      setData(result);
      console.log("data=>",result);
      
    } catch (error) {
      console.log("err", error);

      if (
        error.response.data.status == 401 ||
        error.response.data.status == 501
      ) {
        handleError("UnAuthorized Error..!");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("role");

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    }
  };

  useEffect(() => {
      fetchData();
  }, []);



  return (
    <>
      {data &&<h1>Our Esteemed Users...!</h1>}
      <div className="grid">
        {data?.data.users?.map((user,index) => {
          return (
            <div className="card" key={index}>
              <img
                src="https://api.multiavatar.com/kathrin.svg"
                alt="John"
                width="200px"
              />
              <h1>{user.name}</h1>
              <p className="title">{user.email}</p>
              <p>
                {user.mobile}
                {user.profilePicture}
                id{user._id}
              </p>
              
              <Link to={`/admin/user/edit/${user._id}`}>
                <button>Update</button> 
              </Link>
              <Link to={``}>
                <button onClick={()=>deleteRecord(user._id)}>Delete</button> 
                {/* <button onClick={()=>deleteRecord(user._id)}>Delete</button>  */}
              </Link>

            </div>
          );
        })}
      </div>
      <ToastContainer />
    </>
  );

  
}

async function deleteRecord(userId){


  console.log(userId);
  const deleteConfimration =confirm('please confirm to delete record')
  
  if(deleteConfimration)
  {
        try {
          const url=`http://localhost:4040/user/delUser/${userId}`
          const headers = {
            headers: {
              authorization: localStorage.getItem("token"+1),
            },
          };
          const response=await axios.delete(url,headers)
          console.log(response);
          
          

        } catch (error) {
          console.log(error);
          }

  
  }
}

export default UserControl
