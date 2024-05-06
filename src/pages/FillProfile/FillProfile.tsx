// import styles from './fillprofile.module.css';

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { ChangeEvent, useEffect, useState } from "react";
import { getDefaultNames } from "../../services/getDefaultNames";
import { satisfiesContactInformTel, setContactInformMail, setFioInform, setFioRuk, setMmpCount, setName, setOrgId, setRole, setShortName, setSmpCount, setUserId, setWebsite } from "../../store/createProfileState";
import { Adress } from "../../Components/Adress";

export function FillProfile() {
  const item = useSelector((state: RootState) => state.login.defaultData[0]);
  const ProfileState = useSelector((state: RootState) => state.newProfile);
  const dispatch = useDispatch<AppDispatch>();
  const [names, setNames] = useState([{id: 0, name: '', short_name: ''}])

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

  const handleSubmit = () => {
    console.log(ProfileState);
  }

  return (
      <div>
        <div>
          <label htmlFor="select_name">Выберите организацию</label>
          <select value={ProfileState.short_name} onChange={selectChangeHandler} name="select_name">
            <option value=''>Выберите организацию</option>
            {names.map((el)=> {
              return <option key={el.id} value={el.short_name}>{el.short_name}</option>
            })}
          </select>
        </div>
        <div>
          <label htmlFor="fioRuk">ФИО Руководителя</label>
          <input type="text" name="fioRuk" onChange={fioRukHandler} value={ProfileState.fio_ruk}/>
        </div>
        <div>
          <label htmlFor="fioInform">ФИО Ответственного</label>
          <input type="text" name="fioInform" onChange={fioInformHandler} value={ProfileState.fio_inform}/>
        </div>
        <div>
          <label htmlFor="mailInform">Почта Ответственного</label>
          <input type="text" name="mailInform" onChange={contactMailHandler} value={ProfileState.contact_inform_mail}/>
        </div>
        <div>
          <label htmlFor="telInform">Номер телефона Ответственного</label>
          <input type="text" name="telInform" onChange={contactTelHandler} value={ProfileState.contact_inform_tel}/>
        </div>
        <div>
          <label htmlFor="website">Сайт</label>
          <input type="text" name="website" onChange={websiteHandler} value={ProfileState.website}/>
        </div>
        {item.role === 'МО' && (
          <>
            <div>
              <label htmlFor="smpCount">Количество СМП</label>
              <input type="number" name="smpCount" onChange={smpCountHandler} value={ProfileState.smp_count}/>
            </div>
            <div>
              <label htmlFor="smpCount">Количество ММП</label>
              <input type="number" name="smpCount" onChange={mmpCountHandler} value={ProfileState.mmp_count}/>
            </div>
          </>
        )}
        {item.role === 'ОО' && (
          <Adress />
        )}
        <button onClick={handleSubmit}>Отправить</button>
      </div>
  );
}
