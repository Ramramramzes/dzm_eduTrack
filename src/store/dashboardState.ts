import { createSlice } from "@reduxjs/toolkit";

interface IDashboard{
  popup: boolean;
}

const initialState: IDashboard = {
  popup: false,
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setPopup: (state,action) => {
      state.popup = action.payload;
    }
  }
})

export const { setPopup } = dashboardSlice.actions;
export default dashboardSlice.reducer
