import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrementQuantity, incrementQuantity, removeCartItem } from '../redux/slices/cartSlice';
import axios from 'axios';
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from 'react-toastify';
const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart);
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleSubmit = async(e) => {
        e.preventDefault();     

        // Extract form values
        const formData = new FormData(e.target);
        const deliveryAddress = formData.get('address');
        const deliveryContact = formData.get('phone');
        const deliveryZip = formData.get('zip');
        const tprice=total.toFixed(2)
        console.log('Order placed with details:', { deliveryAddress, deliveryContact, deliveryZip ,tprice,cartItems});
        const transformedOrderedItems = cartItems.map(item => ({
            product: item.id, // Use 'product' to match your schema
            price: item.price,
            qty: item.quantity
        }));

        try {
                const url= `http://localhost:4040/product/orderProduct`
                const headers = {
                    headers: {
                      authorization: localStorage.getItem("token"),
                    },
                  };
                const response=await axios.post(url,{
                    tprice,
                    customerId:localStorage.getItem('userId'),
                    orderedItems:transformedOrderedItems,
                    deliveryAddress,
                    deliveryContact,
                    deliveryZip
                })  
                console.log(response);
                if(response.status==200){
                    
                  handleSuccess(response.data.message)
                  e.target.reset();
                  
                }
              
        
            } catch (error) {
              console.log(error);
              handleError(error.response.data.message)
            
            }
    };

    // Calculate total price

    return (
        <>
        {
        cartItems.length > 0 ? (
            <div className="container mt-5">
                <h1 className="mb-4">Checkout Cart</h1>

                {/* Product List */}
                <div className="grid">
                    {cartItems.map((product) => (
                        <div className="card1 border-primary" key={product.id}>
                            <img 
                                className="card-img-flex" 
                                src={product.images} 
                                width="200px" 
                                height="300px" 
                                alt="Product Image" 
                            />
                            <div className="card-body">
                                <h5 className="card-title">{product.brand}</h5>
                                <p className="card-text">${product.price}</p>
                                <div className="d-flex align-items-center">
                                    <button
                                        onClick={() => dispatch(decrementQuantity(product.id))}
                                        className="bt btn btn-dark"
                                    >
                                        -
                                    </button>
                                    <span className="text-lg font-bold mx-2">{product.quantity}</span>
                                    <button
                                        onClick={() => dispatch(incrementQuantity(product.id))}
                                        className="bt btn btn-dark"
                                    >
                                        +
                                    </button>
                                </div>
                                <button 
                                    className="btn btn-danger btn-sm mt-2" 
                                    onClick={() => dispatch(removeCartItem(product.id))}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <h3 className="mt-3">Total: ${total.toFixed(2)}</h3>

                {/* Checkout Form */}
                <h2 className="mt-5">Checkout</h2>
                <form id="checkout-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Address</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="address" 
                            placeholder="Enter Delivery Address" 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="phone" 
                            placeholder="Enter Contact Number" 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Pincode</label>
                        <input 
                            type="number" 
                            className="form-control" 
                            name="zip" 
                            placeholder="Enter Postal Code" 
                            required 
                        />
                    </div>
                    <button type="submit" className="btn btn-success">Checkout</button>
                </form>
            </div>
        ) : (
            <div className="container mt-5">
                <h1>Cart is empty...!</h1><br/>
                
            </div>
        )
    }
        <ToastContainer/>
        </>
    );
};

export default Cart;
