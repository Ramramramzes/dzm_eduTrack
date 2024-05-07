// import styles from './fillprofile.module.css';

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { getDefaultNames } from "../../services/getDefaultNames";
import { satisfiesContactInformTel, setContactInformMail, setFioInform, setFioRuk, setMmpCount, setName, setOrgId, setRole, setShortName, setSmpCount, setUserId, setWebsite } from "../../store/createProfileState";
import { Adress } from "../../Components/Adress";
import { sendProfile } from "../../services/sendProfile";
import { useNavigate } from "react-router-dom";

export function FillProfile() {
  const item = useSelector((state: RootState) => state.login.defaultData[0]);
  const ProfileState = useSelector((state: RootState) => state.newProfile);
  const dispatch = useDispatch<AppDispatch>();
  const [names, setNames] = useState([{id: 0, name: '', short_name: ''}])
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getDefaultNames()
      setNames(res)
    }
    fetchData();
    dispatch(setUserId(item.user_id))
    dispatch(setOrgId(item.org_id))
    dispatch(setRole(item.role))
  },[])

  const selectChangeHandler = (e:ChangeEvent<HTMLSelectElement>) => {
    dispatch(setShortName(e.target.value))

    names.map((el)=> {
      el.short_name === e.target.value ? dispatch(setName(el.name)) : false;
    })
  }

  const fioRukHandler = (e:ChangeEvent<HTMLInputElement>) => {
    dispatch(setFioRuk(e.target.value))
  }

  const fioInformHandler = (e:ChangeEvent<HTMLInputElement>) => {
    dispatch(setFioInform(e.target.value))
  }

  const contactMailHandler = (e:ChangeEvent<HTMLInputElement>) => {
    dispatch(setContactInformMail(e.target.value))
  }

  const contactTelHandler = (e:ChangeEvent<HTMLInputElement>) => {
    dispatch(satisfiesContactInformTel(e.target.value))
  }

  const websiteHandler = (e:ChangeEvent<HTMLInputElement>) => {
    dispatch(setWebsite(e.target.value))
  }

  const smpCountHandler = (e:ChangeEvent<HTMLInputElement>) => {
    dispatch(setSmpCount(e.target.value))
  }

  const mmpCountHandler = (e:ChangeEvent<HTMLInputElement>) => {
    dispatch(setMmpCount(e.target.value))
  }

  // const handleSubmit = async () => {
  //   console.log(ProfileState);
  // }


  return (
      <form onSubmit={async (e:FormEvent) => {
        e.preventDefault()
        const res = await sendProfile(ProfileState)
        if(res === 200){
          navigate('/dashboard')
        }
        
      }}>
        <div>
          <label htmlFor="select_name">Выберите организацию</label>
          <select value={ProfileState.short_name} onChange={selectChangeHandler} name="select_name" required>
            <option value=''>Выберите организацию</option>
            {names.map((el)=> {
              return <option key={el.id} value={el.short_name}>{el.short_name}</option>
            })}
          </select>
        </div>
        <div>
          <label htmlFor="fioRuk">ФИО Руководителя</label>
          <input type="text" name="fioRuk" onChange={fioRukHandler} value={ProfileState.fio_ruk} placeholder="Введите ФИО" required/>
        </div>
        <div>
          <label htmlFor="fioInform">ФИО Ответственного</label>
          <input type="text" name="fioInform" onChange={fioInformHandler} value={ProfileState.fio_inform} placeholder="Введите ФИО" required/>
        </div>
        <div>
          <label htmlFor="mailInform">Почта Ответственного</label>
          <input type="text" name="mailInform" onChange={contactMailHandler} value={ProfileState.contact_inform_mail} placeholder="Введите Почту" required/>
        </div>
        <div>
          <label htmlFor="telInform">Номер телефона Ответственного</label>
          <input type="text" name="telInform" onChange={contactTelHandler} value={ProfileState.contact_inform_tel} placeholder="Введите номер телефона" required/>
        </div>
        <div>
          <label htmlFor="website">Сайт</label>
          <input type="text" name="website" onChange={websiteHandler} value={ProfileState.website} placeholder="Введите сайт" required/>
        </div>
        {item.role === 'МО' && (
          <>
            <div>
              <label htmlFor="smpCount">Количество СМП</label>
              <input type="number" name="smpCount" onChange={smpCountHandler} value={ProfileState.smp_count} placeholder="Введите кол-во СМП" required/>
            </div>
            <div>
              <label htmlFor="smpCount">Количество ММП</label>
              <input type="number" name="smpCount" onChange={mmpCountHandler} value={ProfileState.mmp_count} placeholder="Введите кол-во ММП" required/>
            </div>
          </>
        )}
        {item.role === 'ОО' && (
          <Adress />
        )}
        
        <input type="submit" value="Отправить"/>
      </form>
  );
}
