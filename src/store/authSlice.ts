import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
//import axios, { AxiosError } from 'axios';
import api from '../auth/api';

const api_url = `${import.meta.env.VITE_API_URL}/api/auth`;

const user = JSON.parse(localStorage.getItem('token') || '{}');

const initialState = {
    user: user ? user : null,
    token: user?.token?.accessToken || null,
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

export const logout = createAsyncThunk('user/logout', async () => {
    try {
        const refreshToken = JSON.parse(localStorage.getItem('token') || '{}').refreshToken;
        await api.post(`${api_url}/logout`, { refreshToken });
        localStorage.removeItem('token');
    } catch (error) {
        return error;
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
                state.user = action.payload.user;
                state.token = action.payload.token.accessToken;
            })
            .addCase(fetchUser.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload.error || "Failed to login";
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.token = null;
            })
            .addCase(logout.rejected, (state, action: PayloadAction<any>) => {
                state.error = action.payload.error || "Failed to logout";
            });
    },
});

export const { checkToken, setToken } = authSlice.actions;
export default authSlice.reducer;