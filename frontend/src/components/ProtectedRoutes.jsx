import {Outlet,Navigate} from 'react-router-dom';

import React from 'react'

function ProtectedRoutes() {
        const user=localStorage.getItem('token')

   return user ?<Outlet/> : <Navigate to='/login'/>
  
}

export default ProtectedRoutes
