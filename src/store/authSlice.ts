import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

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
        const response = await axios.post(api_url, credentials);
        console.log(response);
        localStorage.setItem('token', JSON.stringify(response.data.token.accessToken));
        return response.data;
    } catch (error: AxiosError | any) {
        return rejectWithValue(error.response.data);
    }   
});

const authSlice = createSlice({
    name: 'user',
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
        }
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

export default authSlice.reducer;