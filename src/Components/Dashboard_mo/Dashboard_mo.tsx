import styles from './dashboard_mo.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getProfile } from '../../services/getProfile';
import { setProfile } from '../../store/userState';
import { getAdress } from '../../services/getAdress';
import { setDefAdress } from '../../store/defaultDataState';
import { ProgrammCard } from '../ProgrammCard';
import { GetAvailablePrograms} from '../../hooks/getAvailableProgramms';

export function Dashboard_mo() {
  const dispatch = useDispatch<AppDispatch>();
  const LoginState = useSelector((state: RootState) => state.login);
  const UserState = useSelector((state: RootState) => state.user);
  const ProfileState = useSelector((state: RootState) => state.newProfile);
  const navigate = useNavigate();

  const orgId = LoginState.defaultData?.[0]?.org_id ? LoginState.defaultData[0].org_id : 0
  const programms =  GetAvailablePrograms()

  
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
  },[UserState.id, dispatch, ProfileState.user_id])


  return (
    <>
      <h1>Образовательные программы</h1>
      <div className={styles.cardsBlock}>
        {programms && programms.map((programm) => {
          return  <ProgrammCard key={programm.programm_id} programm={programm} orgId={programm.org_id} />
        })}
      </div>
    </>
  );
}