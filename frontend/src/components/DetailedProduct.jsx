import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'  
import { useSelector,useDispatch } from 'react-redux'
import { fetchProducts } from '../redux/slices/productsSlice';
import axios from 'axios';
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from 'react-toastify';
import { addToCart } from '../redux/slices/cartSlice';

// const saveOrder=async()=>{
//   try {
//       const url= `http://localhost:4040/product/orderProduct`
//       const response=await axios.post(url)

//   } catch (error) {
//     console.log(error);
    
//   }
// }


function DetailedProduct() {
  const {id}=useParams();
  // console.log("id",id);
  
  const dispatch=useDispatch();
  useEffect(() => {
    dispatch(fetchProducts(id))
   
  }, []);

  const response=useSelector(state=>state?.allProducts?.data);
  const product=response?.products[0];
  console.log("single",product);
  

  const saveOrder=async(product)=>{
    console.log(id);
    
    try {
    //     const url= `http://localhost:4040/product/orderProduct`
    //     const response=await axios.post(url,{
    //       price:product.price,
    //       customerId:localStorage.getItem('userId'),
    //       orderedItems:product._id
    //     })
    //     console.log(response);
    //     if(response){
    //       handleSuccess('product saved in orders')
    //     }
      const {_id,images,brand,price,title}=product
    
        dispatch(addToCart({
            title:product.title,
            images:product.images,
            price:product.price,
            id:product._id,
            brand:product.brand

        }))

    } catch (error) {
      console.log(error);
      handleError(error.response.data.message)
    
    }

  }

if(!product){
  return <><h1>Loading</h1></>
}

  return (<>
        <center> <h1>Detailed product</h1></center>
        <div className="card" key={1} >


        <img
            className="IMG"
            src={product.images}
            height="200px"
            width="200px"
            alt=""
          />
          <h2>
            {product.brand}
          </h2>
          <p className="price">{product.title}</p>
          <p><i className="fas fa-rupee-sign"></i> {product.price}</p>
          <p>
            {/* <button onClick={(e)=>dispatch(addItem({title:product.title,price:product.price}))} >Add to Cart</button> */}
            <button onClick={()=>saveOrder(product)} >Add to Cart</button>
          </p>

          <div>
            <hr />
            <h5>Ratings : {product.rating}</h5>
            <p><b>Return Policy - </b>{product.returnPolicy}</p>
          </div>
    </div>
    <ToastContainer/>
    </>
  )}


export default DetailedProduct
