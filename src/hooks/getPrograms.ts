import axios from "axios";
import { useEffect, useState } from "react";

export interface IProgramms{
  programm_id: number;
  name: string;
  hours: number;
  spec_main: number;
  full_name: string;
  short_content: string;
  programm_type: number;
  adress: string;
  org_id: number;
  status: number;
}

export const GetPrograms = (org_id:number) => {
  const [data,setData] = useState<IProgramms[]>([])

  useEffect(() => {
    const fetchData = async() =>{
      try{
        const res = await axios.get('/get-programs',{
          params:{
            org_id: org_id,
          }
        })
        return setData(res.data);
        
      }catch(err){
        console.log(err);
      }
    }
    fetchData();
  },[org_id])
  return data;
}