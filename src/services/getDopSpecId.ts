import axios from "axios";

export interface IDopSpecId {
  id:number,
  dop_spec_id:number,
  programm_id:number,
}

export const getDopSpecId = async (programm_id:number) => {
  try{
    const res = await axios.get('/get-dop-spec-id',{
      params:{
        programm_id:programm_id,
      }
    })
    return res.data;
  }catch(err){
    console.log(err);
  }
}