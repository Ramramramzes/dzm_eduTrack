// import styles from './programm.module.css';

import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { getProgramm } from "../../services/getProgramm";
import { setProgramm } from "../../store/programmState";

export function Programm() {
  const dispatch = useDispatch<AppDispatch>();
  const ProgrammState = useSelector((state: RootState) => state.programmPage.programm);
  const location = useLocation();
  const programmId = location.state;
  
useEffect(() => {
  const fetchData = async() => {
    const res = await getProgramm(programmId)
    console.log(res);
    dispatch(setProgramm(res))
  }
  fetchData()
},[])

  const navigate = useNavigate()
  return (
    <>
      <h1>{ProgrammState.full_name}</h1>
      <div>
        <p>Колл-во часов: {ProgrammState.hours}</p>
        <p>Основная специальность: {ProgrammState.spec_main}</p>
        <p>Дополнительная специальность: {ProgrammState.spec_dop}</p>
        <p>Описание: {ProgrammState.short_content}</p>
        <p>Адрес проведения: {ProgrammState.adress}</p>
        {ProgrammState.status === 100 ? <>Программа не подтверждена</> : ProgrammState.status === 200 ? <>Программа активна</> : <>Программа требует доработки</>}
      </div>
      <button onClick={() => navigate(-1)}>Назад</button>
    </>
  );
}
