import axios from "axios";
import { useEffect, useState } from "react";
import { IProgramms } from "./getPrograms";

export const GetAvailablePrograms = () => {
  const [data,setData] = useState<IProgramms[]>([])

  useEffect(() => {
    const fetchData = async() =>{
      try{
        const res = await axios.get('/get-available')
        return setData(res.data);
        
      }catch(err){
        console.log(err);
      }
    }
    fetchData();
  },[])
  return data;
}