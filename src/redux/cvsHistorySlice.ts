import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface CVState {
    cvs: string[];
    loading: boolean;
    error: string | null;
}

const initialState: CVState = {
    cvs: [],
    loading: false,
    error: null,

};

export const fetchCVs = createAsyncThunk("cvs/fetchCVs", async () => {
    const response = await axios.get("/api/cv");
    return response.data ;
});

const cvSlice = createSlice({
    name: "cvs",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCVs.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchCVs.fulfilled, (state, action) => {
            state.loading = false;
            state.cvs = action.payload;
        });
        builder.addCase(fetchCVs.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message ?? null;
        });
    },
});

export default cvSlice.reducer;
