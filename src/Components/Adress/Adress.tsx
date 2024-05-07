// import styles from './adress.module.css';

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { setAdress } from "../../store/createProfileState";
import { ChangeEvent } from "react";

export function Adress() {
  const ProfileState = useSelector((state: RootState) => state.newProfile);
  const dispatch = useDispatch<AppDispatch>();
  const adress = ProfileState.adress;

  const addAdress = () => {
    const newAdress = {
      id: new Date().getTime(),
      value: '',
    }
    dispatch(setAdress([...adress, newAdress]))
  }

  const delleteAdress = (id:number) => {
    dispatch(setAdress(ProfileState.adress.filter(el => el.id !== id)))
  }

  const inputChange = (id:number, e:ChangeEvent<HTMLInputElement>) => {
    dispatch(setAdress(ProfileState.adress.map((el) => {
      if(el.id === id){
        return {...el,value: e.target.value,}
      }
      return el;
    }))
  )}

  return (
    <>
      {ProfileState.adress.length > 0 && ProfileState.adress.map((el) => {
        return <div key={el.id}>
                  <input type="text" value={el.value} onChange={(e) => {inputChange(el.id,e)}} placeholder="Введите адрес" required/>
                  {ProfileState.adress.length != 1 ? <button onClick={() => delleteAdress(el.id)}>X</button> : ''}
                </div>
      })}
      <button onClick={addAdress}>Добавить адрес</button>
    </>
  );
}
