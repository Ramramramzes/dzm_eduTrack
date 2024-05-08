import { createSlice } from "@reduxjs/toolkit"

interface IPopup{
  hours: number;
}

const initialState: IPopup = {
  hours: 0,
}

const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    setHour: (state, action) => {
      state.hours = action.payload
    },
  }
})

export const {setHour} = popupSlice.actions
export default popupSlice.reducer