import axios from "axios";

export const getOrgName = async (org_id:number) => {
  try{
    const res = await axios.get('/get-org-name',{
      params:{
        org_id: org_id,
      }
    })
    return res.data[0];
  }catch(err){
    console.log(err);
  }
}