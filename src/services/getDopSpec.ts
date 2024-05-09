import axios from "axios";

export const getDopSpec = async () => {
  try{
    const res = await axios.get('/get-dop-spec')
    return res.data;
  }catch(err){
    console.log(err);
  }
}