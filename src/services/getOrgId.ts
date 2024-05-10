import axios from "axios";

export const getOrgId = async (user_id:number) => {
  try{
    const res = await axios.get('/get-orgid',{
      params:{
        user_id: user_id,
      }
    })
    return res.data[0].org_id;
  }catch(err){
    console.log(err);
  }
}