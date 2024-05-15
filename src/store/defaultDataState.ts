import { createSlice } from "@reduxjs/toolkit";
import { IProgrammAdress } from "../services/getAdress";
import { getDopSpec } from "../services/getDopSpec";
import { IHours, getHours } from "../services/getHours";
import { IMainSpec, getMainSpec } from "../services/getMainSpec";
import { IProgrammType, getProgrammType } from "../services/getProgrammType";
import { IProfileType, getProfileType } from "../services/getDefaultProfileType";
import { IProgrammVid, getProgrammVid } from "../services/getProgrammVid";

interface IDefaultData{
  hours: IHours[];
  mainSpec: IMainSpec[]; 
  dopSpec: IMainSpec[];
  programmType: IProgrammType[];
  adress: IProgrammAdress[]
  profileType: IProfileType[]
  vid: IProgrammVid[]
}

const initialState: IDefaultData = {
  hours: await getHours(),
  mainSpec: await getMainSpec(),
  dopSpec: await getDopSpec(),
  programmType: await getProgrammType(),
  profileType: await getProfileType(),
  vid: await getProgrammVid(),
  adress: [],
}

const defaultDataSlice = createSlice({
  name: "defaultData",
  initialState,
  reducers: {
    setDefAdress: (state,action) => {
      state.adress = action.payload
    }
  }
})

export const {setDefAdress} = defaultDataSlice.actions
export default defaultDataSlice.reducer