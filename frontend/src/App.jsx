import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from './components/Navbar'
import Home from './components/Home';
import Login from './components/formHandling/Login';
import Signup from './components/formHandling/Signup';
import AdminDash from './components/Admin/AdminDash';
import UserControl from './components/Admin/user/UserControl';
import ProductsController from './components/Admin/products/ProductsController';
import UpdateUser from './components/Admin/user/UpdateUser';
import DetailedProduct from './components/DetailedProduct';
import ProductForm from './components/Admin/products/AddProduct';
import ProtectedRoutes from './components/ProtectedRoutes';
import ViewAllOrders from './components/Admin/products/ViewAllOrders';
import Cart from './components/Cart';


function App() {

  const isAdmin=localStorage.getItem('role')

  useEffect(()=>{
    //  console.log('admin set');
     
    },[isAdmin,ProtectedRoutes])

  // console.log("in app",isAdmin);
  
  return (

    <>
    
    <Router>
      
      <Navbar/>
        <Routes>
        <Route path="/" index element={<Home/>}/>
        

            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/productDetail/:id" element={<DetailedProduct/>}/>
            <Route path="/orders" element={<Cart/>}/>
            
            {/* <Route path="*" element={<div> 404 Page Not Found !</div>}/> */}

            { isAdmin && isAdmin=='admin'? (
              
            <Route element={<ProtectedRoutes/>}>
                          {/* <Route path="/" index element={<Home/>}/> */}
                   
                        {/* Admin-user */}0
                        <Route path="/admin" element={<AdminDash/>}/>
                        <Route path="/admin/users" element={<UserControl/>}/>
                        <Route path="admin/user/edit/:userId" element={<UpdateUser/>}/>
                        
                        {/* Products Route */}

                        <Route path="/admin/products" element={<ProductsController/>}/>
                        <Route path="/admin/products/addProduct" element={<ProductForm/>}/>
                        <Route path="/admin/ViewAllOrders" element={<ViewAllOrders/>}/>



            </Route>
          ) : " (<Route path="*" element={<div> 404 Page Not Found !</div>}/> ) "}


        </Routes>
   </Router>
   </>
  )
}

export default App
