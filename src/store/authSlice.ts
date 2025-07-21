import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
//import axios, { AxiosError } from 'axios';
import api from '../auth/api';

const api_url = `${import.meta.env.VITE_API_URL}/api/auth`;

const user = JSON.parse(localStorage.getItem('token') || '{}');

const initialState = {
    user: user ? user : null,
    token: user?.token || null,
    error: false,
    success: false,
    loading: false,
};

export const fetchUser = createAsyncThunk('user/fetchUser', async (credentials, {rejectWithValue}) => {
    try {
        const response = await api.post(api_url, credentials);
        localStorage.setItem('token', JSON.stringify(
            {
                accessToken: response.data.token.accessToken,
                refreshToken: response.data.token.refreshToken
            }
        ));
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data);
    }   
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        checkToken: (state) => {
            const user = JSON.parse(localStorage.getItem('token') || '{}');
            if(user && user.token) {
                state.user = user;
                state.token = user.token;
            } else {
                state.user = null;
                state.token = null;
            }
        },
        setToken: (state, action: PayloadAction<any>) => {
            state.token = action.payload.accessToken;
            state.user.refreshToken = action.payload.refreshToken;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload.error || "Failed to login";
            });
    },
});

export const { checkToken, setToken } = authSlice.actions;
export default authSlice.reducer;