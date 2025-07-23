import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

const api_url = `${import.meta.env.VITE_API_URL}/api`;
const user = JSON.parse(localStorage.getItem('token') || '{}');

export const getEmployee = createAsyncThunk("employee/getEmployee", async () => {
    try {
        const response = await axios.get(`${api_url}/employee`, {
            headers: {
                Authorization: `Bearer ${user.accessToken}`,
            },
        });
        return response.data;
    } catch (error: AxiosError | any) {
        return error;
    }
});

export const createEmployee = createAsyncThunk('employee/createEmployee', async (data, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${api_url}/employee`, data, {
            headers: {
                Authorization: `Bearer ${user.accessToken}`,
            },
        });
        return response.data;
    } catch (error: AxiosError | any) {
        return rejectWithValue(error.response.data);
    }
})

const employeeSlice = createSlice({
    name: 'employee',
    initialState: {
        employee: null,
        loading: false,
        error: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getEmployee.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getEmployee.fulfilled, (state, action) => {
                state.loading = false;
                state.employee = action.payload;
            })
            .addCase(getEmployee.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload.error || "Error getting employee";
            })
            .addCase(createEmployee.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(createEmployee.fulfilled, (state, action) => {
                state.loading = false;
                state.employee = action.payload;
            })
            .addCase(createEmployee.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload.error || "Error creating employee";
            });
    },
});

export default employeeSlice.reducer;