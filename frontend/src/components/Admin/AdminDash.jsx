import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { handleError } from "../../utils";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function AdminDash() {
   return(

   <>
      <div>
          <Link to='/admin/users'> User Controller</Link><br/>
          <Link to='/admin/products'> products Controller</Link><br/>
          <Link to='/admin/ViewAllOrders'> View all Orders</Link><br/>
          <Link to='/'> abc Controller</Link><br/>


      </div>
    </>
) 
}

export default AdminDash
