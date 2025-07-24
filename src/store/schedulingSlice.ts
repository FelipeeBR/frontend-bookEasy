import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

const api_url = `${import.meta.env.VITE_API_URL}/api`;
const user = JSON.parse(localStorage.getItem('token') || '{}');

export const createScheduling = createAsyncThunk('scheduling/createScheduling', async (data, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${api_url}/scheduling`, data, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`,
                },
            }
        );
        return response.data;
    } catch (error: AxiosError | any) {
        return rejectWithValue(error.response.data);
    }
});

const schedulingSlice = createSlice({
    name: 'scheduling',
    initialState: {
        loading: false,
        error: null,
        data: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createScheduling.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createScheduling.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(createScheduling.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload || "Error creating scheduling";
            });
    },
});

export default schedulingSlice.reducer;