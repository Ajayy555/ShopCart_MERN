import React from 'react'
import { Link } from 'react-router-dom'

function ProductsController() {
  return (
  <>
        <Link to='\'>View All Products</Link><br/>
        <Link to='/admin/products/addProduct'>Add  Product</Link><br/>
        <Link to='\'>Modify Products</Link><br/>
        <Link to='\'>Delete Products</Link><br/>
    
  </>
  )
}

export default ProductsController
