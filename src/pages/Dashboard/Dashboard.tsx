import styles from './dashboard.module.css';
import { Popup } from "../../Components/Popup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { setPopup } from "../../store/dashboardState";
import { GetPrograms } from "../../hooks/getPrograms";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const DashboardState = useSelector((state: RootState) => state.dashboard);
  const LoginState = useSelector((state: RootState) => state.login);
  const navigate = useNavigate();
  const orgId = LoginState.defaultData?.[0]?.org_id ? LoginState.defaultData[0].org_id : 0
  const programms =  GetPrograms(orgId)

  useEffect(() => {
    if(orgId === 0){
      navigate('/')
    }
  },[navigate, orgId])

  return (
    <>
      <div className={styles.cardsBlock}>
        {programms && programms.map((programm) => {
          return  <div className={styles.card} key={programm.programm_id}>
                    <h3>{programm.name}</h3>
                  </div>
        })}
      </div>
      {DashboardState.popup && <Popup />}
      <button onClick={() => {dispatch(setPopup(true))}}>Добавить программу</button>
    </> 
  );
}
