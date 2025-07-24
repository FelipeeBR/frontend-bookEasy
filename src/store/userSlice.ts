import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

const api_url = `${import.meta.env.VITE_API_URL}/api`;
const user = JSON.parse(localStorage.getItem('token') || '{}');

export const createUser = createAsyncThunk('user/createUser', async (data, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${api_url}/register`, data);
        return response.data;
    } catch (error: AxiosError | any) {
        return rejectWithValue(error.response.data);
    }
});

export const getUser = createAsyncThunk("user/getUser", async () => {
    try {
        const response = await axios.get(`${api_url}/user`, {
            headers: {
                Authorization: `Bearer ${user.accessToken}`,
            },
        });
        return response.data;
    } catch (error: AxiosError | any) {
        return error;
    }
    
});

export const getCustomer = createAsyncThunk("user/getCustomer", async () => {
    try {
        const response = await axios.get(`${api_url}/customer`, {
            headers: {
                Authorization: `Bearer ${user.accessToken}`,
            },
        });
        return response.data;
    } catch (error: AxiosError | any) {
        return error;
    }
});

export const createCustomer = createAsyncThunk('user/createCustomer', async (data, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${api_url}/customer`, data, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`,
                },
            }
        );
        return response.data;
    } catch (error: AxiosError | any) {
        return rejectWithValue(error.response.data);
    }
})

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        loading: false,
        error: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(createUser.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload.error || "Error creating user";
            })
            .addCase(getUser.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(getUser.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload.error || "Error getting user";
            })
            .addCase(createCustomer.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(createCustomer.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(createCustomer.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload.error || "Error creating customer";
            })
            .addCase(getCustomer.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getCustomer.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(getCustomer.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload.error || "Error getting customer";
            });
    },
});

export default userSlice.reducer;