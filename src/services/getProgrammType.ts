import axios from "axios";

export interface IProgrammType{
  id:number,
  type:string,
  value: number,
}

export const getProgrammType = async () => {
  try{
    const res = await axios.get('/get-programm-type')
    return res.data;
  }catch(err){
    console.log(err);
  }
}