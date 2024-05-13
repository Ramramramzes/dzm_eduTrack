import styles from './dashboard_mo.module.css';
import { GetPrograms } from '../../hooks/getPrograms';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import { setPopup } from '../../store/dashboardState';
import { Popup } from '../Popup';
import { useEffect } from 'react';
import { getProfile } from '../../services/getProfile';
import { setProfile } from '../../store/userState';
import { getAdress } from '../../services/getAdress';
import { setDefAdress } from '../../store/defaultDataState';
import { ProgrammCard } from '../ProgrammCard';

export function Dashboard_mo() {
  const dispatch = useDispatch<AppDispatch>();
  const DashboardState = useSelector((state: RootState) => state.dashboard);
  const LoginState = useSelector((state: RootState) => state.login);
  const UserState = useSelector((state: RootState) => state.user);
  const ProfileState = useSelector((state: RootState) => state.newProfile);
  const navigate = useNavigate();

  const orgId = LoginState.defaultData?.[0]?.org_id ? LoginState.defaultData[0].org_id : 0
  //! заменить на getAllAvailableProgramms
  const programms =  GetPrograms(orgId)

  
  useEffect(() => {
    if(orgId === 0){
      navigate('/')
    }
  },[navigate, orgId])

  useEffect(() => {
    const fetchData = async() =>{
      const profile = await getProfile(UserState.id)
      dispatch(setProfile(profile))
    }

    fetchData()
  },[])
  
  useEffect(() => {
    const fetchData = async () => {
      const adress = await getAdress(UserState.id)
      dispatch(setDefAdress(adress))
    }

    if(ProfileState.user_id === 0){
      fetchData()
    }
  },[UserState.id, dispatch, DashboardState.popup, ProfileState.user_id])


  return (
    <>
      <h1>Образовательные программы</h1>
      <div className={styles.cardsBlock}>
        {programms && programms.map((programm) => {
          return  programm.status != 500 ? <ProgrammCard key={programm.programm_id} programm={programm} orgId={orgId} /> : <></>
        })}
      </div>
      {DashboardState.popup && <Popup />}
      <button onClick={() => {dispatch(setPopup(true))}}>Добавить программу</button>
    </>
  );
}