import { ChangeEvent, FormEvent } from 'react';
import styles from './login.module.css';
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin, setPassword } from '../../store/loginState';

export function Login() {
  const LoginState = useSelector((state: RootState) => state.login);
  const dispatch = useDispatch<AppDispatch>();

  const loginHandler = (e:ChangeEvent<HTMLInputElement>) => {
    dispatch(setLogin(e.target.value))
  }

  const passwordHandler = (e:ChangeEvent<HTMLInputElement>) => {
    dispatch(setPassword(e.target.value))
  }

  const submitHandler = (e:FormEvent) => {
    e.preventDefault();
    console.log(LoginState.login, LoginState.password);
  }

  return (
    <div className={styles.loginBlock}>
      <form className={styles.form} onSubmit={submitHandler}>
        <input type="text" onChange={loginHandler} value={LoginState.login}/>
        <input type="text" onChange={passwordHandler} value={LoginState.password}/>
        <input type="submit" value="Войти"/>
      </form>
    </div>
  );
}
