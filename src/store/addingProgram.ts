import { createSlice } from "@reduxjs/toolkit"
import { IProgrammAdress } from "../services/getAdress";

export interface IPopup{
  hours: number;
  programmName: string;
  mainSpec: number;
  dopspec: number[]
  fullName: string;
  description: string;
  programmType: number;
  adress: IProgrammAdress[];
  status: number;
  vid: number;
  date:string;
}

const initialState: IPopup = {
  hours: 0,
  programmName: '',
  mainSpec: 0,
  dopspec:[],
  fullName: '',
  description: '',
  programmType: 0,
  adress: [],
  status: 100,
  vid: 0,
  date:''
}

const popupSlice = createSlice({
  name: 'addingProgramm',
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
    },
    setDopSpec: (state,action) => {
      state.dopspec = action.payload
    },
    setVid: (state,action) => {
      state.vid = action.payload
    },
    setDate: (state,action) => {
      state.date = action.payload
    }

  }
})

export const {setHour, setProgrammName, setMainSpec, setFullName, setDescription, setProgrammType, setProgrammAdress, setDopSpec, setVid, setDate} = popupSlice.actions
export default popupSlice.reducer