import styles from './programmcard.module.css';
import { IProgramms } from '../../hooks/getPrograms';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { IMainSpec } from '../../services/getMainSpec';
import { backStatus, roundColor } from '../../style/_dashboard';
import { Link } from'react-router-dom';
import { getOrgName } from '../../services/getOrgName';
import { useEffect, useState } from 'react';

export function ProgrammCard({ programm,orgId}: {programm :IProgramms, orgId : number, key: number}) {
  // const dispatch = useDispatch<AppDispatch>();
  const DefaultData = useSelector((state: RootState) => state.default);
  const LoginState = useSelector((state: RootState) => state.login);
  const [orgName, setOrgName] =useState('')

  useEffect(() => {
    const fetchData = async() =>{
      const res = await getOrgName(Number(orgId))
      setOrgName(res)
    }

    fetchData()
    
  },[])
  
  return (
    <Link to='/programm' state={programm.programm_id} className={styles.card}>
                    <h3>{programm.name}</h3>
                    {LoginState.defaultData[0]?.role === 'МО' && typeof orgName === 'string'? <p key={programm.programm_id}>{orgName}</p> : <></>}
                    <p>Время обучения {programm.hours} ч.</p>
                    <div>
                      <p>Основная специальность: {DefaultData.mainSpec.map((main:IMainSpec) => {
                                                    return main.value === programm.spec_main ? main.name : ''
                                                  })}</p>
                    <div className={styles.statusBlock} style={backStatus(programm.status === 200 ? '#00FF00' : programm.status === 100 ? '#FFFF00' : '#FF0000')}>
                      {programm.status === 200 ? 'Программа активна' : programm.status === 100 ? 'Программа в обработке' : 'Программа требует исправления'}
                      <div className={styles.neon} style={roundColor(programm.status === 200 ? '#00FF00' : programm.status === 100 ? '#FFFF00' : '#FF0000')}></div>
                    </div>
                    </div>
                  </Link>
  );
}
