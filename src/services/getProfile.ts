import axios from "axios";

export const getProfile = async (user_id:number) => {
  try{
    const res = await axios.get('/get-profile',{
      params:{
        user_id: user_id,
      }
    })
    return res.data[0];
  }catch(err){
    console.log(err);
  }
}