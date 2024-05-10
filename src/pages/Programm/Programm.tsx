// import styles from './programm.module.css';

import { useNavigate } from "react-router-dom";

export function Programm() {
  const navigate = useNavigate()
  return (
    <>
      <h1>Programm Page</h1>
      <button onClick={() => navigate(-1)}>Назад</button>
    </>
  );
}
