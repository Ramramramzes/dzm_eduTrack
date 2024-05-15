// import styles from './checkboxes.module.css';

import { useDispatch, useSelector } from "react-redux";
import {  AppDispatch, RootState } from "../../store/store";
import { setDopSpec } from "../../store/addingProgram";

export function Checkboxes() {
  const dispatch = useDispatch<AppDispatch>();
  const DefaultState = useSelector((state: RootState) => state.default);
  const AddingState = useSelector((state: RootState) => state.addingProg.dopspec);

  // Проверка типа AddingState перед использованием includes
  const checkArrChange = (val: number) => {
    if (Array.isArray(AddingState)) {
      if (AddingState.includes(val)) {
        dispatch(setDopSpec(AddingState.filter(el => el !== val)));
      } else {
        dispatch(setDopSpec([...AddingState, val]));
      }
    } else {
      console.error('AddingState is not an');
    }
  };

  return (
    <>
      {DefaultState.dopSpec.map((ch) => {
        return (
          <div key={ch.id}>
            <label htmlFor={`${ch.name}`}>{ch.name}</label>
            <input type="checkbox" name={`${ch.name}`} value={ch.value} onChange={() => {checkArrChange(ch.value)}} />
          </div>
        );
      })}
    </>
  );
}

