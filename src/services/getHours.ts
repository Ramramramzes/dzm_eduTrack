import axios from "axios";

export interface IHours{
  id:number,
  hours_value:number,
}

export const getHours = async () => {
  try{
    const res = await axios.get('/get-hours')
    return res.data;
  }catch(err){
    console.log(err);
  }
}