import axios from "axios";
import { IStudent } from "../store/createStudents";

export const sendStudent = async(student:IStudent,programm_id:number) => {
  try{
    const res = axios.post('/send-students',{
      name:student.name,
      surname:student.surname,
      lastname:student.lastname,
      snils:student.snils,
      main_spec:student.mainSpec,
      programm_id:programm_id,
    })
    return (await res).status;
  }catch(err){
    console.log(err);
  }
}