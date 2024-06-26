import { createSlice } from "@reduxjs/toolkit";

export interface INewProfile{
  user_id: number;
  org_id: number;
  name: string;
  short_name: string;
  fio_ruk: string;
  fio_inform: string;
  contact_inform_mail: string;
  contact_inform_tel: string;
  website: string;
  smp_count: number;
  mmp_count: number;
  adress: {id: number; value: string}[];
  role: string;
  type: string;
}

const initialState:INewProfile = {
  user_id: 0,
  org_id: 0,
  name: '',
  short_name: '',
  fio_ruk: '',
  fio_inform: '',
  contact_inform_mail: '',
  contact_inform_tel: '',
  website: '',
  smp_count: 0,
  mmp_count: 0,
  adress: [{id: new Date().getTime(), value: ''}],
  role: '',
  type: '',
}

const newProfileSlice = createSlice({
  name: "newProfile",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.user_id = action.payload
    },
    setOrgId: (state, action) => {
      state.org_id = action.payload
    },
    setName: (state, action) => {
      state.name = action.payload
    },
    setShortName: (state, action) => {
      state.short_name = action.payload
    },
    setFioRuk: (state, action) => {
      state.fio_ruk = action.payload
    },
    setFioInform: (state, action) => {
      state.fio_inform = action.payload
    },
    setContactInformMail: (state, action) => {
      state.contact_inform_mail = action.payload
    },
    satisfiesContactInformTel: (state, action) => {
      state.contact_inform_tel = action.payload
    },
    setWebsite: (state, action) => {
      state.website = action.payload
    },
    setSmpCount: (state, action) => {
      state.smp_count = action.payload
    },
    setMmpCount: (state, action) => {
      state.mmp_count = action.payload
    },
    setAdress: (state, action) => {
      state.adress = action.payload
    },
    setRole: (state, action) => {
      state.role = action.payload
    },
    setType: (state, action) => {
      state.type = action.payload
    }
  }
})

export const {setUserId, setOrgId, setName, setShortName, setFioRuk, setFioInform, setContactInformMail, satisfiesContactInformTel, setWebsite, setSmpCount, setMmpCount, setAdress, setRole, setType} = newProfileSlice.actions
export default newProfileSlice.reducer
