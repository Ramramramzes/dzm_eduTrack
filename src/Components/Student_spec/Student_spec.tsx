// import styles from './student_spec.module.css';

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { ChangeEvent, useEffect } from "react";
import { IMainSpec } from "../../services/getMainSpec";
import { setOneStudentSpecs } from "../../store/createStudents";
import Accordion from 'react-bootstrap/Accordion';

export function Student_spec({id}:{id: number}) {
  const dispatch = useDispatch<AppDispatch>();
  const DefaultState = useSelector((state: RootState) => state.default);
  const AllStudentsSpecs = useSelector((state: RootState) => state.students.specs);
  const allChecks = [...DefaultState.mainSpec, ...DefaultState.dopSpec]

  const checkChange = (id:number,el:IMainSpec,checked:boolean) => {
    AllStudentsSpecs.forEach((spec) => {
      if(checked){
        if(spec.id === id){
          dispatch(setOneStudentSpecs({id:id,oneStudentSpecs:[...spec.oneStudentSpecs,el.value]}));
        }
      }else{
        if(spec.id === id){
          dispatch(setOneStudentSpecs({id:id,oneStudentSpecs:spec.oneStudentSpecs.filter(specEl => specEl!== el.value)}));
        }
      }
    })
  }


useEffect(() => {
  console.log(AllStudentsSpecs);
});

  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Выбрать специальности</Accordion.Header>
        <Accordion.Body>
        {allChecks.map((el,index) => {
          return <div key={index}>
                  <label htmlFor={`${el.name}`}>{el.name}</label>
                  <input type="checkbox" name={`${el.name}`} value={el.value} onChange={(e:ChangeEvent<HTMLInputElement>) => checkChange(id,el,e.target.checked)} />
                </div>
        })}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
