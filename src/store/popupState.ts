import { createSlice } from "@reduxjs/toolkit"
import { IProgrammAdress } from "../services/getAdress";

export interface IPopup{
  hours: number;
  programmName: string;
  mainSpec: number;
  dopSpec: number;
  fullName: string;
  description: string;
  programmType: number;
  adress: IProgrammAdress[];
  status: number;
}

const initialState: IPopup = {
  hours: 0,
  programmName: '',
  mainSpec: 0,
  dopSpec: 0,
  fullName: '',
  description: '',
  programmType: 0,
  adress: [],
  status: 100,
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
    },
    setDescription: (state, action) => {
      state.description = action.payload
    },
    setProgrammType: (state, action) => {
      state.programmType = action.payload
    },
    setProgrammAdress: (state, action) => {
      state.adress = action.payload
    }

  }
})

export const {setHour, setProgrammName, setMainSpec, setDopSpec, setFullName, setDescription, setProgrammType, setProgrammAdress } = popupSlice.actions
export default popupSlice.reducer