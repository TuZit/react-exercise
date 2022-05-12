import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const register = createAsyncThunk(
  'auth/register',
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/v1/auth/register',
        { username, password }
      );
      return response.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }, thunkAPI) => {
    try {
      const res = await axios.post('http://localhost:5000/api/v1/auth/login', {
        username,
        password,
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', () => {
  localStorage.clear();
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    accessToken: null,
  },
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.accessToken = action.payload.accessToken;
    },
    [register.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.accessToken = action.payload.accessToken;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.accessToken = '';
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
