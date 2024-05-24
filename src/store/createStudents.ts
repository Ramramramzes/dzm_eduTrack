import { createSlice } from "@reduxjs/toolkit"

interface IStudents{
  students: IStudent[],
  programm_id: number,
  specs: {
    id: number,
    oneStudentSpecs: number[],
  }[],
}

export interface ISpec{
  id: number,
  snils: string,
  name: string,
}

export interface IStudent{
  id: number,
  name: string,
  surname: string,
  lastname: string,
  snils: string,
  mainSpec: number | string,
}

const initialState:IStudents = {
  students: [],
  programm_id: 0,
  specs: [],
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
    },
    setSpecs: (state, action) =>{
      state.specs = action.payload;
    },
    setOneStudentSpecs: (state, action) => {
      state.specs.forEach((specEl) => {
        if(specEl.id === action.payload.id){
          specEl.oneStudentSpecs = action.payload.oneStudentSpecs;
        }
      })
    },

  }
})

export const {setStudents, setProgrammId,setSpecs,setOneStudentSpecs} = studentsSlice.actions
export default studentsSlice.reducer