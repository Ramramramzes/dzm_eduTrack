// import styles from './dashboard.module.css';
import { useSelector } from 'react-redux';
import { Dashboard_oo } from '../../Components/Dashboard_oo';
import { RootState } from '../../store/store';
import { Dashboard_mo } from '../../Components/Dashboard_mo';
import { Login } from '../Login';

export function Dashboard() {
  const LoginState = useSelector((state: RootState) => state.login);
  return (
    <>
      {LoginState.defaultData[0]?.role === 'ОО' ? <Dashboard_oo /> : LoginState.defaultData[0]?.role === 'МО' ? <Dashboard_mo /> : <Login />}
    </> 
  );
}
