import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "../thunks/thunks";


const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        products: [],
        product: null,
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                if(!Array.isArray(action.payload)){
                    state.product = action.payload;
                }else {
                    state.products = action.payload;
                }
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default categoriesSlice.reducer;
