import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false
  },
  reducers: {
    setUserAuthorization: (store, action) => {
      store.isAuthenticated = action.payload;
    }
  }
});

export const { setUserAuthorization } = authSlice.actions;
export default authSlice.reducer;
