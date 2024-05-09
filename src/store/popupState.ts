import { createSlice } from "@reduxjs/toolkit"

interface IPopup{
  hours: number;
  programmName: string;
}

const initialState: IPopup = {
  hours: 0,
  programmName: '',
}

const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    setHour: (state, action) => {
      state.hours = action.payload
    },
    setProgrammName: (state, action) => {
      state.programmName = action.payload
    }
  }
})

export const {setHour, setProgrammName, } = popupSlice.actions
export default popupSlice.reducer