import axios from "axios";

export interface IProfileType{
  id:number,
  type:string,
  value: number,
}

export const getProfileType = async () => {
  try{
    const res = await axios.get('/get-profile-type')
    return res.data;
  }catch(err){
    console.log(err);
  }
}