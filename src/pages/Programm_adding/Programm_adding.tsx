import styles from './programm_adding.module.css';
import { ChangeEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { setDescription, setDopSpec, setFullName, setHour, setMainSpec, setProgrammAdress, setProgrammName, setProgrammType } from '../../store/popupState';
import { setPopup } from '../../store/dashboardState';
import { sendProgramm } from '../../services/sendProgramm';
import { getOrgId } from '../../services/getOrgId';
import { useNavigate } from 'react-router-dom';
const root_popup = document.getElementById('root_popup')

export function Programmadding() {
  const dispatch = useDispatch<AppDispatch>();
  const PopupState = useSelector((state: RootState) => state.popup);
  const UserState = useSelector((state: RootState) => state.user);
  const DefaultState = useSelector((state: RootState) => state.default);
  const popupBlock = document.getElementById('popupBlock');
  const navigate = useNavigate()

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

  return (
    <div className={styles.popupBlock} id='popupBlock'>
      <button onClick={() => navigate(-1)}>Назад</button>
      <form className={styles.form} onSubmit={async(e) => {
        e.preventDefault()
        const orgIdForReq = await getOrgId(UserState.id)
        await sendProgramm(PopupState,orgIdForReq)
        dispatch(setPopup(false))
        dispatch(setHour(0))
        dispatch(setProgrammName(''))
        dispatch(setMainSpec(0))
        dispatch(setDopSpec(0))
        dispatch(setFullName(''))
        dispatch(setDescription(''))
        dispatch(setProgrammType(0))
        navigate(-1)
      }}>
        <div>
          <label htmlFor="programmName"></label>
          <input type="text" name="programmName" value={PopupState.programmName} onChange={nameHandler} placeholder='Название программы' required/>
        </div>
        <div>
          <label htmlFor="hours"></label>
          <select name="hours" required defaultValue={''} onChange={hourHandler}>
            <option value={''} disabled>Выберите часы</option>
            {DefaultState.hours.length > 0 && DefaultState.hours.map((hour) => {
              return <option key={hour.id} value={hour.hours_value}>{hour.hours_value}</option>
            })}
          </select>
        </div>
        <div>
          <label htmlFor="mainSpec"></label>
          <select name="mainSpec" required defaultValue={''} onChange={mainSpecHandler}>
            <option value={''} disabled>Выберите основную специальность</option>
            {DefaultState.mainSpec.length > 0 && DefaultState.mainSpec.map((spec) => {
              return <option key={spec.id} value={spec.value}>{spec.name}</option>
            })}
          </select>
        </div>
        <div>
          <label htmlFor="dopSpec"></label>
          <select name="dopSpec" defaultValue={''} onChange={dopSpecHandler}>
            <option value={''} disabled>Выберите доп специальность</option>
            {DefaultState.dopSpec.length > 0 && DefaultState.dopSpec.map((spec) => {
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
            {DefaultState.programmType.length > 0 && DefaultState.programmType.map((spec) => {
              return <option key={spec.id} value={spec.value}>{spec.type}</option>
            })}
          </select>
        </div>
        <div>
          <label htmlFor="adress"></label>
          <select name="adress" required defaultValue={''} onChange={adressHandler}>
            <option value={''} disabled>Выберите адрес</option>
            {DefaultState.adress.length > 0 && DefaultState.adress.map((adr) => {
              return <option key={adr.adress_id} value={adr.adress}>{adr.adress}</option>
            })}
          </select>
        </div>
        <span className={styles.closeBtn} onClick={() => dispatch(setPopup(false))}>✕</span>
        <input type="submit" value="Отправить программу" />
      </form>
    </div>
  );
}
