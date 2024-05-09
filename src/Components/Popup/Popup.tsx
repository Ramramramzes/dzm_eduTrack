import { ChangeEvent, useEffect, useState } from 'react';
import styles from './popup.module.css';
import { createPortal } from "react-dom";
import { IHours, getHours } from '../../services/getHours';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { setHour, setMainSpec, setProgrammName } from '../../store/popupState';
import { IMainSpec, getMainSpec } from '../../services/getMainSpec';
const root_popup = document.getElementById('root_popup')

export function Popup() {
  const dispatch = useDispatch<AppDispatch>();
  const [hours,setHours] = useState<IHours[]>([]);
  const [mainSpec,setMainSpecArr] = useState<IMainSpec[]>([]);
  const PopupState = useSelector((state: RootState) => state.popup);
  
  useEffect(() => {
    const fetchData = async() => {
      const hoursRes = await getHours()
      const mainSpecRes = await getMainSpec()
      hoursRes ? setHours(hoursRes) : []
      mainSpecRes ? setMainSpecArr(mainSpecRes) : []
    }

    fetchData()
  },[])

  const hourHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setHour(Number(event.target.value)))
  }
  
  const nameHandler = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setProgrammName(event.target.value))
  }

  const mainSpecHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setMainSpec(event.target.value))
  }

  if (!root_popup) {
    return <>no poput</>
  }
  return createPortal(
    <div className={styles.popupBlock}>
      <form onSubmit={(e) => {
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
          {/* main_spec && dop_spec */}
        </div>
        <input type="submit" value="goo" />
      </form>
    </div>,root_popup
  );
}
