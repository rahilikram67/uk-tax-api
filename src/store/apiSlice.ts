import { createSlice } from "@reduxjs/toolkit"

const slice = createSlice({
    name: "api",
    initialState: {
        headers: [],
        url: "",
        path: [],
        query: [],
        method: ""
    },
    reducers: {
        setApiData: (state, action) => {
            state.headers = action.payload.headers || []
            state.url = action.payload.url
            state.path = action.payload.path
            state.query = action.payload.query || []
            state.method = action.payload.method
        }
    }
})

export const { setApiData } = slice.actions
export default slice.reducer


