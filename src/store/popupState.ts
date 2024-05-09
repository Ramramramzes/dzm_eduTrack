import { createSlice } from "@reduxjs/toolkit"

interface IPopup{
  hours: number;
  programmName: string;
  mainSpec: number;
  dopSpec: number;
  fullName: string;
}

const initialState: IPopup = {
  hours: 0,
  programmName: '',
  mainSpec: 0,
  dopSpec: 0,
  fullName: ''
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
    },
    setDopSpec: (state, action) => {
      state.dopSpec = action.payload
    },
    setFullName: (state, action) => {
      state.fullName = action.payload
    }

  }
})

export const {setHour, setProgrammName, setMainSpec, setDopSpec, setFullName } = popupSlice.actions
export default popupSlice.reducer