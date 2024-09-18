import {createSlice,nanoid} from '@reduxjs/toolkit'


const userInfoSlice=createSlice({
    name:"userInfo",
    initialState:[],
    reducers:{
        addUser:(state,action)=>{
            state.push(action.payload)
        },
        removeUser:(state,action)=>{

        }
    }

})

export const {addUser}=userInfoSlice.actions;
export default userInfoSlice.reducer;

