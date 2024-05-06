import axios from "axios";

export const checkLogin = async (login: string, password: string) => {
  try{
    const result = await axios.get('/login', {
      params:{
        login: login,
        password: password,
      }
    });
    return result.data;
  }catch(err){
    console.log(err);
  }
}