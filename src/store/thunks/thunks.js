import {createAsyncThunk} from "@reduxjs/toolkit";
import {api} from "../../api/api";

export const loginUser = createAsyncThunk(
    "user/loginUser",
    async (params, thunkAPI) => {
        console.log(params);
        try {
            const res = await api.post("/auth/login", params);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || "Login failed");
        }
    }
);

export const signUpUser = createAsyncThunk(
    "user/signUpUser",
    async (params, thunkAPI) => {
        try {
            const res = await api.post("/users/", {...params, avatar: "https://picsum.photos/800"});
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || "Login failed");
        }
    }
);

export const getUserById = createAsyncThunk(
    "user/getUserById",
    async (id, thunkAPI) => {
        try {
            const res = await api.get(`/users/${id}`);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch user");
        }
    }
);

export const fetchCategories = createAsyncThunk(
    "categories/fetchAll",
    async (params, { rejectWithValue }) => {
        try {
            const res = await api.get(params);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const fetchProducts = createAsyncThunk(
    "products/fetchAll",
    async (params, { rejectWithValue }) => {
        try {
            const res = await api.get(params);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);
