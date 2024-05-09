import axios from "axios";

export interface IMainSpec{
  id:number,
  name:string,
  value: number,
}

export const getMainSpec = async () => {
  try{
    const res = await axios.get('/get-main-spec')
    return res.data;
  }catch(err){
    console.log(err);
  }
}