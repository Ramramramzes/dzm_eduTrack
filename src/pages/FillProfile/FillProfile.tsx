// import styles from './fillprofile.module.css';

import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export function FillProfile() {
  const item = useSelector((state: RootState) => state.login.defaultData[0]);
  return (
    <>
    FillProfile page
    {<div>Имя - {item.name}, Id_организации - {item.org_id}, Роль - {item.role}, User_id - {item.user_id}</div>}
    </>
  );
}
