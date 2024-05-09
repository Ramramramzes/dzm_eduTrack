import { createSlice } from "@reduxjs/toolkit"

interface IPopup{
  hours: number;
  programmName: string;
  mainSpec: number;
}

const initialState: IPopup = {
  hours: 0,
  programmName: '',
  mainSpec: 0,
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
    },
    setMainSpec: (state, action) => {
      state.mainSpec = action.payload
    }

  }
})

export const {setHour, setProgrammName, setMainSpec, } = popupSlice.actions
export default popupSlice.reducer