import { createSlice } from "@reduxjs/toolkit";

interface IProgramm{
  name: string;
  hours: number;
  spec_main: null | number;
  spec_dop: null | number;
  full_name: string;
  shour_content: string;
  programm_type: number;
  adress: string;
  org_id: number;
  status: number;
}

const initialState: IProgramm = {
  name: '',
  hours: 0,
  spec_main: null,
  spec_dop: null,
  full_name: '',
  shour_content: '',
  programm_type: 0,
  adress: '',
  org_id: 0,
  status: 0,
}

const programmSlice = createSlice({
  name: '',
  initialState,
  reducers: {
    setProgrammName:(state, action) => {
      state.name = action.payload;
    },
    setHours:(state, action) => {
      state.hours = action.payload;
    },
    setSpecMain:(state, action) => {
      state.spec_main = action.payload;
    },
    setSpecDop:(state, action) => {
      state.spec_dop = action.payload;
    },
    setFullName:(state, action) => {
      state.full_name = action.payload;
    },
    setShortContent:(state, action) => {
      state.shour_content = action.payload;
    },
    setProgrammType:(state, action) => {
      state.programm_type = action.payload;
    },
    setAdress:(state, action) => {
      state.adress = action.payload;
    },
    setOrgId:(state, action) => {
      state.org_id = action.payload;
    },
    setProgrammStatus:(state, action) => {
      state.status = action.payload;
    }
  }
})

export const { setProgrammName } = programmSlice.actions;
export default programmSlice.reducer