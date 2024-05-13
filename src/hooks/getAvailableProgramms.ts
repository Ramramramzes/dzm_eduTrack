import axios from "axios";
import { useEffect, useState } from "react";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { IProgramms } from "./getPrograms";

export const GetAvailablePrograms = () => {
  const DashboardState = useSelector((state: RootState) => state.dashboard);

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
  },[DashboardState.popup])
  return data;
}