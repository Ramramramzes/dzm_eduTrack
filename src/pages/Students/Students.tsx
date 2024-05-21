// import styles from './students.module.css';
import { ChangeEvent, FormEvent, useEffect } from 'react';
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IStudent, setProgrammId, setSpecs, setStudents } from '../../store/createStudents';
import { sendStudent } from '../../services/sendStudents';
import { Student_spec } from '../../Components/Student_spec';

export function Students() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()
  const StudentsState = useSelector((state: RootState) => state.students);
  const ProgrammState = useSelector((state: RootState) => state.programmPage.programm);
  const allStudents = useSelector((state: RootState) => state.students.students);


  useEffect(() => {
    dispatch(setStudents([]))
    dispatch(setProgrammId(ProgrammState.programm_id))
  },[])

  const addStudent = () => {
    const createId = new Date().getTime()
    const newStudent:IStudent = {
      id: createId,
      name: '',
      surname: '',
      lastname: '',
      snils: '',
    }
    dispatch(setSpecs([...StudentsState.specs,{id: createId, oneStudentSpecs: []}]))
    dispatch(setStudents([...allStudents,newStudent]))
  }

  const delleteStudent = (id:number) => {
    dispatch(setStudents(allStudents.filter(student => student.id !== id)));
    dispatch(setSpecs(StudentsState.specs.filter(el => el.id !== id)));
  }

  const inputNameChange = (id:number, e:ChangeEvent<HTMLInputElement>) => {
    dispatch(setStudents(allStudents.map((el) => {
      if(el.id === id){
        return {...el,name: e.target.value,}
      }
      return el;
    }))
  )}

  const inputSurnameChange = (id:number, e:ChangeEvent<HTMLInputElement>) => {
    dispatch(setStudents(allStudents.map((el) => {
      if(el.id === id){
        return {...el,surname: e.target.value,}
      }
      return el;
    }))
  )}

  const inputLastnameChange = (id:number, e:ChangeEvent<HTMLInputElement>) => {
    dispatch(setStudents(allStudents.map((el) => {
      if(el.id === id){
        return {...el,lastname: e.target.value,}
      }
      return el;
    }))
  )}
  

  const inputSnilsChange = (id:number, e:ChangeEvent<HTMLInputElement>) => {
    dispatch(setStudents(allStudents.map((el) => {
      if(el.id === id){
        return {...el,snils: e.target.value,}
      }
      return el;
    }))
  )}
  

  return (
    <>
      <form onSubmit={(e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(setStudents(allStudents))
        const resArr = []

        allStudents.forEach(element => {
          const res = sendStudent(element,StudentsState.programm_id)
          resArr.push(res)
        });
        if(resArr.length > 0){
          alert('Все студенты записаны')
          navigate(-1)
        }
      }}>
        <>Students</>
        {allStudents.length > 0 && allStudents.map((st) => {
          return <div key={st.id}>
                  <label htmlFor="name">Имя</label>
                  <input required onChange={(e) => inputNameChange(st.id,e)} type="text" name='name' value={st.name}/>
                  <label htmlFor="surname">Фамилия</label>
                  <input required onChange={(e) => inputSurnameChange(st.id,e)} type="text" name='surname' value={st.surname}/>
                  <label htmlFor="lastname">Отчество</label>
                  <input required onChange={(e) => inputLastnameChange(st.id,e)} type="text" name='lastname' value={st.lastname}/>
                  <label htmlFor="snils">СНИЛС</label>
                  <input required onChange={(e) => inputSnilsChange(st.id,e)} type="text" name='snils' value={st.snils}/>
                  <button onClick={() => delleteStudent(st.id)}>X</button>
                  <Student_spec id={st.id} />
                </div>
        })}
        <button onClick={() => navigate(-1)}>Назад</button>
        <button  onClick={addStudent}>Добавить студента</button>
        <input type="submit" value="Отправить" />
      </form>
    </>
  );
}
