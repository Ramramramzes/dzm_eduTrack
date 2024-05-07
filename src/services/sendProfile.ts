import axios from "axios";
import { INewProfile } from "../store/createProfileState";

export const sendProfile = async(ProfileState:INewProfile) => {
  try{
    const res = axios.post('/send-profile',{
      user_id: ProfileState.user_id,
      org_id: ProfileState.org_id,
      name: ProfileState.name,
      short_name: ProfileState.short_name,
      fio_ruk: ProfileState.fio_ruk,
      fio_inform: ProfileState.fio_inform,
      contact_inform_mail: ProfileState.contact_inform_mail,
      contact_inform_tel: ProfileState.contact_inform_tel,
      website: ProfileState.website,
      smp_count: ProfileState.smp_count,
      mmp_count: ProfileState.mmp_count,
      adress: ProfileState.adress,
      role: ProfileState.role,
    })
    return (await res).status;
  }catch(err){
    console.log(err);
  }
}