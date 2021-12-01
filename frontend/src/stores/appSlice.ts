import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    globalAlert: {
      message: '',
      error: false,
    },
    isLoggedIn: false,
    isLoading: true,
  },
  reducers: {
    setError: (state, action) => {
      state.globalAlert.message = action.payload;
      state.globalAlert.error = true;
    },
    setSuccess: (state, action) => {
      state.globalAlert.message = action.payload;
      state.globalAlert.error = false;
    },
    clearMessage: (state) => {
      state.globalAlert.message = '';
      state.globalAlert.error = false;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const appReducer = appSlice.reducer;
export const { setError, setSuccess, clearMessage, setIsLoading, setIsLoggedIn } = appSlice.actions;
