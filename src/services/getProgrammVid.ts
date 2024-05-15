import axios from "axios";

export interface IProgrammVid{
  id:number,
  vid:string,
  value: number,
}

export const getProgrammVid = async () => {
  try{
    const res = await axios.get('/get-programm-vid')
    return res.data;
  }catch(err){
    console.log(err);
  }
}