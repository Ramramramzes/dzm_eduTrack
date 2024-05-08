import axios from "axios";

export const sendAdress = async(adress: {id: number; value: string}, profile_id: number) => {
  try{
    const res = axios.post('/send-adress',{
      profile_id: profile_id,
      adress: adress.value,
    })
    return (await res).status;
  }catch(err){
    console.log(err);
  }
}