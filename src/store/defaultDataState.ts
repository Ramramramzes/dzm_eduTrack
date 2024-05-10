import { createSlice } from "@reduxjs/toolkit";
import { IProgrammAdress } from "../services/getAdress";
import { getDopSpec } from "../services/getDopSpec";
import { IHours, getHours } from "../services/getHours";
import { IMainSpec, getMainSpec } from "../services/getMainSpec";
import { IProgrammType, getProgrammType } from "../services/getProgrammType";

interface IDefaultData{
  hours: IHours[];
  mainSpec: IMainSpec[]; 
  dopSpec: IMainSpec[];
  programmType: IProgrammType[];
  adress: IProgrammAdress[]
}

const initialState: IDefaultData = {
  hours: await getHours(),
  mainSpec: await getMainSpec(),
  dopSpec: await getDopSpec(),
  programmType: await getProgrammType(),
  adress: [],
}

const defaultDataSlice = createSlice({
  name: "defaultData",
  initialState,
  reducers: {
    setAdress: (state,action) => {
      state.adress = action.payload
    }
  }
})

export const {setAdress} = defaultDataSlice.actions
export default defaultDataSlice.reducer