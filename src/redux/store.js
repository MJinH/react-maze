import { configureStore } from "@reduxjs/toolkit";
import mazeReducer from "./mazeSlice"


export default configureStore({
    reducer: {
        maze:mazeReducer
    }
})