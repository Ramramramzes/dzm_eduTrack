import axios from "axios";

export const getProgramm = async (programm_id:number) => {
  try{
    const res = await axios.get('/get-programm',{
      params:{
        programm_id: programm_id,
      }
    })
    return res.data[0];
  }catch(err){
    console.log(err);
  }
}