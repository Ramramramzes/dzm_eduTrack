import axios from "axios";
import { useEffect, useState } from "react";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";

export interface IProgramms{
  programm_id: number;
  name: string;
  hours: number;
  spec_main: number;
  spec_dop: number;
  full_name: string;
  short_content: string;
  programm_type: number;
  adress: string;
  org_id: number;
  status: number;
}

export const GetPrograms = (org_id:number) => {
  const DashboardState = useSelector((state: RootState) => state.dashboard);

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
  },[org_id,DashboardState.popup])
  return data;
}