import { createSlice } from "@reduxjs/toolkit";
import { IProgramms } from "../hooks/getPrograms";

interface IProgrammPage{
  programm: IProgramms
}

const initialState: IProgrammPage = {
  programm: {
    programm_id: 0,
    name: '',
    hours: 0,
    spec_main: 0,
    spec_dop: 0,
    full_name: '',
    short_content: '',
    programm_type: 0,
    adress: '',
    org_id: 0,
    status: 0,
    vid: 0
  }
}

const programmPageSlice = createSlice({
  name: 'programmPage',
  initialState,
  reducers: {
    setProgramm:(state, action) => {
      state.programm = action.payload;
    }
  }
})

export const { setProgramm } = programmPageSlice.actions;
export default programmPageSlice.reducer