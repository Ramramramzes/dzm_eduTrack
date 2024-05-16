import styles from './dashboard_oo.module.css';
import { GetPrograms } from '../../hooks/getPrograms';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProfile } from '../../services/getProfile';
import { setProfile } from '../../store/userState';
import { getAdress } from '../../services/getAdress';
import { setDefAdress } from '../../store/defaultDataState';
import { IDopSpecId, getDopSpecId } from '../../services/getDopSpecId';

export function Dashboard_oo() {
  const dispatch = useDispatch<AppDispatch>();
  const LoginState = useSelector((state: RootState) => state.login);
  const UserState = useSelector((state: RootState) => state.user);
  const ProfileState = useSelector((state: RootState) => state.newProfile);
  const DefaultState = useSelector((state: RootState) => state.default);
  const navigate = useNavigate();
  const [dopSpecs,setDopSpecs] = useState<IDopSpecId[]>([])
  const orgId = LoginState.defaultData?.[0]?.org_id ? LoginState.defaultData[0].org_id : 0
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
  },[UserState.id, dispatch, ProfileState.user_id])

  useEffect(() => {
    const fetchData = async (id: number) => {
      const res = await getDopSpecId(id)
      setDopSpecs(res.map((el:number) => el))
    }

    programms.forEach(item => {
      fetchData(item.programm_id);
    });
    
  }, [programms]);

  return (
    <>
      <h1>Программы {UserState && UserState.profile && UserState.profile.short_name}</h1>
      <button onClick={() => navigate('/programmadding')}>Добавить программу</button>
      <table>
        <thead>
          <tr>
            <th>Наименование образовательной программы</th>
            <th>Статус</th>
            <th>Вид дополнительной программы</th>
            <th>Основная специальность</th>
            <th>Дата создания</th>
            <th>Дата последнего изменения</th>
            <th>Дополнительные специальности</th>
            <th>Количество часов</th>
            <th>Адреса реализации</th>
          </tr>
        </thead>
        <tbody>
          {programms.map(item => (
            <tr key={item.programm_id}>
              <td><Link to='/programm' state={item.programm_id} className={styles.link}>{item.name}</Link></td>
              <td>{item.status === 100 ? 'В обработке' : item.status === 200? 'Рабочая' : 'Исправить'}</td>
              <td>{DefaultState.vid[item.vid-1].vid}</td>
              <td>{DefaultState.mainSpec[item.spec_main].name}</td>
              <td>Созд</td>
              <td>Изм</td>
              <td>{dopSpecs.map((el:IDopSpecId,index:number) => {
                return <span key={el.id}>{DefaultState.dopSpec[el.dop_spec_id-1].name}{index != dopSpecs.length-1 ? ', ' : '.'}</span>
              })}</td>
              <td>{item.hours}</td>
              <td>{item.adress}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <h1>Программы {UserState && UserState.profile && UserState.profile.short_name}</h1>
      <div className={styles.cardsBlock}>
        {programms && programms.map((programm) => {
          return  <ProgrammCard key={programm.programm_id} programm={programm} orgId={orgId} />
        })}
      </div>
      <button onClick={() => navigate('/programmadding')}>Добавить программу</button> */}
    </>
  );
}
