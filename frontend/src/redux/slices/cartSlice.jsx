import { createSlice } from '@reduxjs/toolkit';


const cartSlice = createSlice({
    name: 'cart',
    initialState:[],
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existingItem = state.find(product => product.id === item.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.push({ ...item, quantity: 1 });
            }
        },
        removeCartItem: (state, action) => {
            const id = action.payload;
            return state.filter(item => item.id !== id);
        },
        incrementQuantity: (state, action) => {
            const id = action.payload;
            const item = state.find(item => item.id === id && item.quantity<=5)
            if (state.find(item => item.id === id && item.quantity<5)) {
                item.quantity += 1;
            }else 
            {
                console.log('Max Buy Limit -5 reached')
                
            }
            //  else {
            //     console.error(`Item with id ${id} not found.`);
            // }
        },
        decrementQuantity: (state, action) => {
            const id = action.payload;
            const item = state.find(item => item.id === id);
            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    return state.filter(item => item.id !== id);
                }
            } else {
                console.error(`Item with id ${id} not found.`);
            }
        },
    },
});

// Export actions to be used in components
export const { addToCart, removeCartItem, incrementQuantity, decrementQuantity } = cartSlice.actions;

// Export the reducer to be used in the store
export default cartSlice.reducer;
