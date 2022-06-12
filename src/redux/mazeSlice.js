import { createSlice } from "@reduxjs/toolkit";

export const mazeSlice = createSlice({
    name:"maze",
    initialState: {
        gridData: {
            grid:[],
            shortestPath:[],
            walls:[]
        },
        pending: null,
        error:false
    },
    reducers: {
        updateStart: (state) => {
            state.pending = true
        },
        updateSuccess: (state,action) => {
            state.pending = false
            state.gridData = action.payload
        },
        updateError: (state) => {
            state.pending = false
            state.error = true
        }
    }
})



export const {updateStart, updateSuccess, updateError} = mazeSlice.actions
export default mazeSlice.reducer