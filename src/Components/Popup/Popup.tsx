import { ChangeEvent, useEffect, useState } from 'react';
import styles from './popup.module.css';
import { createPortal } from "react-dom";
import { IHours, getHours } from '../../services/getHours';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { setHour } from '../../store/popupState';
const root_popup = document.getElementById('root_popup')

export function Popup() {
  const dispatch = useDispatch<AppDispatch>();
  const [hours,setHours] = useState<IHours[]>([]);
  const PopupState = useSelector((state: RootState) => state.popup);
  
  useEffect(() => {
    const fetchData = async() => {
      const res = await getHours()
      res ? setHours(res) : []
    }

    fetchData()
  },[])

  const hourHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setHour(Number(event.target.value)))
  }

  if (!root_popup) {
    return <>no poput</>
  }
  return createPortal(
    <div className={styles.popupBlock}>
      <form onSubmit={(e) => {
        e.preventDefault()
        console.log('отправка',PopupState.hours)}}>
        <div>
          <label htmlFor="hours"></label>
          <select name="hours" required defaultValue={''} onChange={hourHandler}>
            <option value={''} disabled>Выберите часы</option>
            {hours.length > 0 && hours.map((hour) => {
              return <option key={hour.id} value={hour.hours_value}>{hour.hours_value}</option>
            })}
          </select>
        </div>
        <input type="submit" value="goo" />
      </form>
    </div>,root_popup
  );
}
