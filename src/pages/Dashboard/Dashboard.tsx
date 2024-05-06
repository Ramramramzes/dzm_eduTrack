// import styles from './dashboard.module.css';

import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const UserState = useSelector((state: RootState) => state.user);
  const navigation = useNavigate();
  console.log(UserState.id);

  return (
    <>
      {UserState.id != 0 && UserState.id ? 
      <>
        user_id = {UserState.id}
      </>
      
      :<button onClick={() => {navigation('/')}}>Войти</button>}
    </>
  );
}
