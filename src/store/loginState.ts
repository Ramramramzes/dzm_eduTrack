import { createSlice } from "@reduxjs/toolkit";

interface ILogin {
  login: string;
  password: string;
  defaultData: defaultDataItem[];
}

interface defaultDataItem{
  user_id: number;
  org_id: number;
  name: string;
  role: string;
}

const initialState: ILogin = {
  login: '',
  password: '',
  defaultData: [],

}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.login = action.payload
    },
    setPassword: (state, action) => {
      state.password = action.payload
    },
    setDefaultData: (state, action) => {
      state.defaultData = action.payload
    }
  }
})

export const { setLogin, setPassword, setDefaultData } = loginSlice.actions
export default loginSlice.reducer