import styles from './dashboard.module.css';
import { Popup } from "../../Components/Popup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { setPopup } from "../../store/dashboardState";
import { GetPrograms } from "../../hooks/getPrograms";
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IMainSpec } from '../../services/getMainSpec';
import { backStatus, roundColor } from '../../style/_dashboard';
import { setAdress } from '../../store/defaultDataState';
import { getAdress } from '../../services/getAdress';

export function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const DashboardState = useSelector((state: RootState) => state.dashboard);
  const LoginState = useSelector((state: RootState) => state.login);
  const UserState = useSelector((state: RootState) => state.user);
  const DefaultData = useSelector((state: RootState) => state.default);

  const navigate = useNavigate();
  const orgId = LoginState.defaultData?.[0]?.org_id ? LoginState.defaultData[0].org_id : 0
  const programms =  GetPrograms(orgId)


  useEffect(() => {
    const fetchData = async () => {
      const adress = await getAdress(UserState.id)
      dispatch(setAdress(adress))
    }

    fetchData()
  },[UserState.id, dispatch])

  useEffect(() => {
    if(orgId === 0){
      navigate('/')
    }
  },[navigate, orgId])

  return (
    <>
      <h1>Программы </h1>
      <div className={styles.cardsBlock}>
        {programms && programms.map((programm) => {
          return  <Link to={'/programm'} className={styles.card} key={programm.programm_id}>
                    <h3>{programm.name}</h3>
                    <p>Время обучения {programm.hours} ч.</p>
                    <div>
                      <p>Основная специальность:</p>
                      <p>{DefaultData.mainSpec.map((main:IMainSpec) => {
                      return main.value === programm.spec_main ? main.name : ''
                    })}</p>
                    <div className={styles.statusBlock} style={backStatus(programm.status === 200 ? '#00FF00' : programm.status === 100 ? '#FFFF00' : '#FF0000')}>
                      {programm.status === 200 ? 'Программа активна' : programm.status === 100 ? 'Программа в обработке' : 'Программа требует исправления'}
                      <div className={styles.neon} style={roundColor(programm.status === 200 ? '#00FF00' : programm.status === 100 ? '#FFFF00' : '#FF0000')}></div>
                    </div>
                    </div>
                  </Link>
        })}
      </div>
      {DashboardState.popup && <Popup />}
      <button onClick={() => {dispatch(setPopup(true))}}>Добавить программу</button>
    </> 
  );
}
