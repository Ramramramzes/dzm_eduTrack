import { createSlice } from "@reduxjs/toolkit";
import { INewProfile } from "./createProfileState";

interface IUser{
  id: number;
  profile: INewProfile;
}

const initialState: IUser = {
  id: 0,
  profile: {
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
    adress: [],
    role: '',
  }
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setId: (state, action) => {
      state.id = action.payload
    },
    setProfile: (state, action) => {
      state.profile = action.payload
    }
  }
})

export const { setId, setProfile } = userSlice.actions
export default userSlice.reducer