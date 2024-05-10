import axios from "axios";
import { IPopup } from "../store/popupState";



export const sendProgramm = async (programm:IPopup,orgIdForReq:number) => {
  try{
    const res = await axios.post('/send-programm',{
      programm: programm,
      org_id: orgIdForReq,
    })
    
    return res.data;
  }catch(err){
    console.log(err);
  }
}