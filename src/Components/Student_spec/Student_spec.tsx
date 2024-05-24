// import styles from './student_spec.module.css';

import { useEffect } from "react";

// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../../store/store";

export function Student_spec({id}:{id: number}) {
  // const dispatch = useDispatch<AppDispatch>();
  // const DefaultState = useSelector((state: RootState) => state.default);
  // const AllStudentsSpecs = useSelector((state: RootState) => state.students.specs);

  useEffect(() => {console.log(id)},[])

  return (
    <>Доп спекс</>
  );
}
