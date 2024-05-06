import axios from "axios";

export const checkProfileData = async(id:number) => {
  try{
    const result = await axios.get('/check-profile',{
      params:{
        id: id,
      }
    })
    return result.data.length;
  }catch(err){
    console.log(err);
  }
}