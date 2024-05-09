// import styles from './dashboard.module.css';

import { Popup } from "../../Components/Popup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { setPopup } from "../../store/dashboardState";

export function Dashboard() {
  const DashboardState = useSelector((state: RootState) => state.dashboard);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      {DashboardState.popup && <Popup />}
      <button onClick={() => {dispatch(setPopup(true))}}>Добавить программу</button>
    </>
  );
}
