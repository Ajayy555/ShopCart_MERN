import {configureStore} from "@reduxjs/toolkit"
import userInfoSlice from "./slices/userSlice"
import productsSlice from "./slices/productsSlice"
import cartSlice from "./slices/cartSlice"

export const store=configureStore({
    reducer:{
        user:userInfoSlice,
        allProducts:productsSlice,
        cart:cartSlice
    }
})

