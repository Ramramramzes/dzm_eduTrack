import axios from "axios";

export const getDefaultNames = async() => {
  try{
    const result = await axios.get('/default-names')
    return result.data;
  }catch(err){
    console.log(err);
  }
}