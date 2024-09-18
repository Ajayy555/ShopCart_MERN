import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { handleError } from "../utils";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./../App.css";
import { useSelector,useDispatch } from 'react-redux'
import { fetchProducts } from "../redux/slices/productsSlice";


function Home() {

  const storedUser = localStorage.getItem("user");
  // const [data, setData] = useState();
  const navigate = useNavigate();
  const dispatch=useDispatch();

  const isAdmin=localStorage.getItem('role')

  useEffect(()=>{
  //  console.log('admin set');
   
  },[isAdmin])

  useEffect(() => {
    dispatch(fetchProducts())
    

    // fetchData();
  }, []);

    const user=useSelector(state=>state?.user)
  const data=useSelector(state=>state?.allProducts?.data)
  console.log("user",user);
  console.log("data",data);
  

  
  
  // const fetchData = async () => {

  


  //   try {
  //     // const url = "http://localhost:4040/user/api/u-v/allUsers";
  //     const url = "  ";
  //     const headers = {
  //       headers: {
  //         authorization: localStorage.getItem("token"),
  //       },
  //     };
  //     const response = await axios(url, headers);
  //     const result = response;
  //     setData(result);
  //     console.log(result);
      
  //   } catch (error) {
  //     console.log("err", error);

  //     if (
  //       error.response.data.status == 401 ||
  //       error.response.data.status == 501
  //     ) {
  //       handleError("UnAuthorized Error..!");
  //       localStorage.removeItem("token");
  //       localStorage.removeItem("user");

  //       setTimeout(() => {
  //         navigate("/login");
  //       }, 1000);
  //     }
  //   }
  // };
 

  return (
    <>
<div className='grid'>
{
  data?.products?.map((product)=>(
    // const { id, brand, title, category, price, images }=product;
<Link to={`/productDetail/${product._id}` } key={product._id} className="card-link">
 <div className="card">
          <img
            className="IMG"
            src={product.images}
            height="200px"
            width="200px"
            alt=""
          />
          <h3>
            {product.brand} ({product.cateogry})
          </h3>
          <p className="price">{product.title}</p>
          <p><i className="fas fa-rupee-sign"></i> {product.price}</p>
          <p>
            {/* <button onClick={(e)=>dispatch(addItem({title,price}))} >Add to Cart</button> */}
          </p>
    
  </div>
 </Link>

))}
</div>

      <ToastContainer />
    </>
  );
}
export default Home;
