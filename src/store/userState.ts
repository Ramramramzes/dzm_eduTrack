import { createSlice } from "@reduxjs/toolkit";

interface IUser{
  id: number;
}

const initialState: IUser = {
  id: 0,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setId: (state, action) => {
      state.id = action.payload
    }
  }
})

export const { setId } = userSlice.actions
export default userSlice.reducer