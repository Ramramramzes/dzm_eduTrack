import axios from "axios";

export interface IProgrammAdress{
  adress_id: number;
  profile_id: number;
  adress: string;
}

export const getAdress = async (profile_id:number) => {
  try{
    const result = await axios.get('/get-programm-adress',{
      params:{
        profile_id: profile_id,
      }
    })
    
    return result.data;
  }catch(err){
    console.log(err);
  }
}