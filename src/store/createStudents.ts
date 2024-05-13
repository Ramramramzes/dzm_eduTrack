import { createSlice } from "@reduxjs/toolkit"

interface IStudents{
  students: IStudent[],
  programm_id: number,
}

export interface IStudent{
  id: number,
  name: string,
  surname: string,
  lastname: string,
  snils: string,
}

const initialState:IStudents = {
  students: [],
  programm_id: 0
}

const studentsSlice = createSlice({
  name:'students',
  initialState,
  reducers: {
    setStudents: (state, action) => {
      state.students = action.payload;
    },
    setProgrammId: (state, action) =>{
      state.programm_id = action.payload;
    }
  }
})

export const {setStudents, setProgrammId} = studentsSlice.actions
export default studentsSlice.reducer