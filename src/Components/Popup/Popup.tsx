import styles from './popup.module.css';
import { ChangeEvent, useEffect, useState } from 'react';
import { createPortal } from "react-dom";
import { IHours, getHours } from '../../services/getHours';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { setDescription, setDopSpec, setFullName, setHour, setMainSpec, setProgrammAdress, setProgrammName, setProgrammType } from '../../store/popupState';
import { IMainSpec, getMainSpec } from '../../services/getMainSpec';
import { getDopSpec } from '../../services/getDopSpec';
import { IProgrammType, getProgrammType } from '../../services/getProgrammType';
import { setPopup } from '../../store/dashboardState';
import { IProgrammAdress, getAdress } from '../../services/getAdress';
const root_popup = document.getElementById('root_popup')

export function Popup() {
  const dispatch = useDispatch<AppDispatch>();
  const [hours,setHours] = useState<IHours[]>([]);
  const [mainSpec,setMainSpecArr] = useState<IMainSpec[]>([]);
  const [dopSpec,setDopSpecArr] = useState<IMainSpec[]>([]);
  const [programmType,setProgrammTypeRes] = useState<IProgrammType[]>([]);
  const [adress,setAdressRes] = useState<IProgrammAdress[]>([])
  const PopupState = useSelector((state: RootState) => state.popup);
  const UserState = useSelector((state: RootState) => state.user);
  const popupBlock = document.getElementById('popupBlock');

  useEffect(() => {
    const fetchData = async() => {
      const hoursRes = await getHours()
      const mainSpecRes = await getMainSpec()
      const dopSpec = await getDopSpec()
      const programmTypeRes = await getProgrammType()
      const adress = await getAdress(UserState.id)
      hoursRes ? setHours(hoursRes) : []
      mainSpecRes ? setMainSpecArr(mainSpecRes) : []
      dopSpec ? setDopSpecArr(dopSpec) : []
      programmTypeRes ? setProgrammTypeRes(programmTypeRes) : []
      adress? setAdressRes(adress) : []
      
    }

    fetchData()
  },[UserState.id])

  useEffect(() => {
    const closePopup = (e:MouseEvent) =>{
      if(popupBlock && e.target === popupBlock){
        dispatch(setPopup(false))
      }
    }
    document.addEventListener('click',closePopup)

    return () =>{
      document.removeEventListener('click',closePopup)
    }
  },[dispatch, popupBlock])

  const hourHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setHour(Number(event.target.value)))
  }
  
  const nameHandler = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setProgrammName(event.target.value))
  }

  const mainSpecHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setMainSpec(Number(event.target.value)))
  }

  const dopSpecHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setDopSpec(Number(event.target.value)))
  }

  const fullNameHandler = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setFullName(event.target.value))
  }

  const descriptionHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setDescription(event.target.value))
  }

  const programmTypeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setProgrammType(Number(event.target.value)))
  }

  const adressHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setProgrammAdress(event.target.value))
  }

  if (!root_popup) {
    return <>no poput</>
  }
  return createPortal(
    <div className={styles.popupBlock} id='popupBlock'>
      <form className={styles.form} onSubmit={(e) => {
        e.preventDefault()
        console.log('отправка',PopupState)}}>
        <div>
          <label htmlFor="programmName"></label>
          <input type="text" name="programmName" value={PopupState.programmName} onChange={nameHandler} placeholder='Название программы' required/>
        </div>
        <div>
          <label htmlFor="hours"></label>
          <select name="hours" required defaultValue={''} onChange={hourHandler}>
            <option value={''} disabled>Выберите часы</option>
            {hours.length > 0 && hours.map((hour) => {
              return <option key={hour.id} value={hour.hours_value}>{hour.hours_value}</option>
            })}
          </select>
        </div>
        <div>
          <label htmlFor="mainSpec"></label>
          <select name="mainSpec" required defaultValue={''} onChange={mainSpecHandler}>
            <option value={''} disabled>Выберите основную специальность</option>
            {mainSpec.length > 0 && mainSpec.map((spec) => {
              return <option key={spec.id} value={spec.value}>{spec.name}</option>
            })}
          </select>
        </div>
        <div>
          <label htmlFor="dopSpec"></label>
          <select name="dopSpec" defaultValue={''} onChange={dopSpecHandler}>
            <option value={''} disabled>Выберите доп специальность</option>
            {dopSpec.length > 0 && dopSpec.map((spec) => {
              return <option key={spec.id} value={spec.value}>{spec.name}</option>
            })}
          </select>
        </div>
        <div>
          <label htmlFor="fullName"></label>
          <input type="text" name="fullName" value={PopupState.fullName} onChange={fullNameHandler} placeholder='Полное наименование' required/>
        </div>
        <div>
          <label htmlFor="description"></label>
          <textarea name="description" value={PopupState.description} onChange={descriptionHandler} placeholder='Описание программы' required></textarea>
        </div>
        <div>
          <label htmlFor="programmType"></label>
          <select name="programmType" required defaultValue={''} onChange={programmTypeHandler}>
            <option value={''} disabled>Выберите тип программы</option>
            {programmType.length > 0 && programmType.map((spec) => {
              return <option key={spec.id} value={spec.value}>{spec.type}</option>
            })}
          </select>
        </div>
        <div>
          <label htmlFor="adress"></label>
          <select name="adress" required defaultValue={''} onChange={adressHandler}>
            <option value={''} disabled>Выберите адрес</option>
            {adress.length > 0 && adress.map((adr) => {
              return <option key={adr.adress_id} value={adr.adress}>{adr.adress}</option>
            })}
          </select>
        </div>
        <span className={styles.closeBtn} onClick={() => dispatch(setPopup(false))}>✕</span>
        <input type="submit" value="Отправить программу" />
      </form>
    </div>,root_popup
  );
}
