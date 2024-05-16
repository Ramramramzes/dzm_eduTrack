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
  const [dopSpecs, setDopSpecs] = useState<IDopSpecId[][]>([]);
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
    setDopSpecs([]);
  
    const fetchData = async (id: number) => {
      const res = await getDopSpecId(id);
      return res;
    };
  
    Promise.all(programms.map(item => fetchData(item.programm_id)))
      .then(results => {
        setDopSpecs(results);
      })
      .catch(error => {
        console.error('Error fetching dopSpecs:', error);
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
          {programms.map((item, progIndex)=> (
            <tr key={item.programm_id}>
              <td><Link to='/programm' state={item.programm_id} className={styles.link}>{item.name}</Link></td>
              <td>{item.status === 100 ? 'В обработке' : item.status === 200? 'Рабочая' : 'Исправить'}</td>
              <td>{DefaultState.vid[item.vid-1].vid}</td>
              <td>{DefaultState.mainSpec[item.spec_main-1]?.name}</td>
              <td>{`${new Date(Number(item.date)).getDate() < 10 ? '0' : ''}${new Date(Number(item.date)).getDate()}.${(new Date(Number(item.date)).getMonth() + 1 < 10 ? '0' : '')}${new Date(Number(item.date)).getMonth() + 1}.${new Date(Number(item.date)).getFullYear()} ${(new Date(Number(item.date)).getHours() < 10 ? '0' : '')}${new Date(Number(item.date)).getHours()}:${(new Date(Number(item.date)).getMinutes() < 10 ? '0' : '')}${new Date(Number(item.date)).getMinutes()}`}</td>
              <td>Изм</td>
              <td>{dopSpecs[progIndex]?.map((el, index) => (
                <span key={index}>
                  {DefaultState.dopSpec[el.dop_spec_id-1]?.name}
                  {index !== dopSpecs[progIndex].length - 1 ? ', ' : ''}
                </span>
              ))}</td>
              <td>{item.hours}</td>
              <td>{item.adress}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
