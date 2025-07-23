import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

const api_url = `${import.meta.env.VITE_API_URL}/api`;
const user = JSON.parse(localStorage.getItem('token') || '{}');

export const createService = createAsyncThunk('service/createService', async (data, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${api_url}/service`, data, {
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

export const getServices = createAsyncThunk("service/getServices", async () => {
    try {
        const response = await axios.get(`${api_url}/services`, {
            headers: {
                Authorization: `Bearer ${user.accessToken}`,
            },
        });
        return response.data;
    } catch (error: AxiosError | any) {
        return error;
    }
});

export const getService = createAsyncThunk("service/getService", async () => {
    try {
        const response = await axios.get(`${api_url}/service`, {
            headers: {
                Authorization: `Bearer ${user.accessToken}`,
            },
        });
        return response.data;
    } catch (error: AxiosError | any) {
        return error;
    }  
});

export const createServiceTime = createAsyncThunk('service/createServiceTime', async (data, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${api_url}/service/time`, data, {
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

export const deleteTime = createAsyncThunk('service/deleteTime', async (id, {rejectWithValue}) => {
    try {
        const response = await axios.delete(`${api_url}/time/${id}`, {
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

const serviceSlice = createSlice({
    name: 'service',
    initialState: {
        services: [] as any[],
        loading: false,
        error: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createService.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(createService.fulfilled, (state, action) => {
                state.loading = false;
                state.services.push(action.payload);
            })
            .addCase(createService.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload.error || "Error creating service";
            })
            .addCase(getServices.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getServices.fulfilled, (state, action) => {
                state.loading = false;
                state.services = action.payload;
            })
            .addCase(getServices.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload.error || "Error getting services";
            })
            .addCase(getService.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getService.fulfilled, (state, action) => {
                state.loading = false;
                state.services = action.payload;
            })
            .addCase(getService.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload.error || "Error getting service";
            })
            .addCase(createServiceTime.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(createServiceTime.fulfilled, (state, action) => {
                state.loading = false;
                state.services = action.payload;
            })
            .addCase(createServiceTime.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload.error || "Error creating service time";
            })
            .addCase(deleteTime.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(deleteTime.fulfilled, (state, action) => {
                state.loading = false;
                state.services = action.payload;
            })
            .addCase(deleteTime.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload.error || "Error deleting service time";
            });
    },
});

export default serviceSlice.reducer;
