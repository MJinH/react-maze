import { updateStart, updateSuccess, updateError } from "./mazeSlice";


export const updateMaze = async (gridData, dispatch) => {
    dispatch(updateStart())
    try {
        dispatch(updateSuccess(gridData))
    } catch {
        console.log("No")
        dispatch(updateError())
    }
}