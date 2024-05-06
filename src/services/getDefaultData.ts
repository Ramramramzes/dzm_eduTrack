import axios from "axios";

export const getDefaultData = async(id:number) => {
  try{
    const result = await axios.get('/default-data',{
      params:{
        id: id,
      }
    })
    return result.data;
  }catch(err){
    console.log(err);
  }
}