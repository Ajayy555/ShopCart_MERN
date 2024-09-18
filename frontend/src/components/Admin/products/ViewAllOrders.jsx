import React from 'react'
import axios from 'axios';
function ViewAllOrders() {


    const fetchAllOrders=async()=>{
        const url="http://localhost:4040/product/viewAllOrders";
        const headers = {
                  headers: {
                    authorization: localStorage.getItem("token"),
                  },
                };

                const response=await axios.get(url,headers)
                console.log(response);
                
    }
    fetchAllOrders();

  return (
    <>
    
    
    </>
  )
}

export default ViewAllOrders
