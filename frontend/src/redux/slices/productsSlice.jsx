import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'   
import { act } from 'react';
import axios from 'axios';
export const fetchProducts=createAsyncThunk('fetchProducts',async(id)=>{
        // const url=id?`https://dummyjson.com/products/category/smartphones{id}`:`https://dummyjson.com/products/category/smartphones`;
        // const url=id?`https://dummyjson.com/products/${id}`:`https://dummyjson.com/products`;
        const url=id?`http://localhost:4040/product/allProducts/${id}`:`http://localhost:4040/product/allProducts`;
  
    try {

        const headers = {
            headers: {
              authorization: localStorage.getItem("token"),
              "content-type":"application/json; charset=utf-8"
            }
          }
        
          
        const res=await axios.get(url,headers)
        // console.log('in thunk ',id,"\b",res);
        return res.data;

    } catch (error) {
        console.log(error);
        
    }
})

const productsSlice=createSlice({
        name:'products',
        initialState:{
            isLoading:false,
            data:null,
            isError:false,
        },

        extraReducers:(builder)=>{
            builder.addCase(fetchProducts.pending,(state,action)=>{
                state.isLoading=true;
            })
            builder.addCase(fetchProducts.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.data=action.payload;
            })
            builder.addCase(fetchProducts.rejected,(state,action)=>{
                state.isError=true;
                console.log("error :",action.payload);
                
            })
        },
})

export default productsSlice.reducer;