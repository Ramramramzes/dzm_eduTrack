import axios from "axios";

export const sendDopSpec = async (programm_id:number,dopSpecId:number) => {
  try{
    const res = await axios.post('/send-dopspec',{
      programm_id: programm_id,
      dopSpecId: dopSpecId,
    })
    
    return res.data;
  }catch(err){
    console.log(err);
  }
}