import { ChangeEvent, FormEvent } from 'react';
import styles from './login.module.css';
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin, setPassword } from '../../store/loginState';
import { checkLogin } from '../../services/checkLogin';
import { useNavigate } from 'react-router-dom';
import { setId } from '../../store/userState';

export function Login() {
  const LoginState = useSelector((state: RootState) => state.login);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigate();

  const loginHandler = (e:ChangeEvent<HTMLInputElement>) => {
    dispatch(setLogin(e.target.value))
  }

  const passwordHandler = (e:ChangeEvent<HTMLInputElement>) => {
    dispatch(setPassword(e.target.value))
  }

  const submitHandler = async (e:FormEvent) => {
    e.preventDefault();
    const res = await checkLogin(LoginState.login,LoginState.password)
    if(res.length === 0){
      alert('Неверный логин или пароль')
    }else{
      dispatch(setLogin(''))
      dispatch(setPassword(''))
      dispatch(setId(res[0].id))
      navigation('/dashboard')
      
    }
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
