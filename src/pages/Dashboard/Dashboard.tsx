// import styles from './dashboard.module.css';

import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export function Dashboard() {
  const UserState = useSelector((state: RootState) => state.user);
  console.log(UserState.id);

  return (
    <>
      дашборд
    </>
  );
}
