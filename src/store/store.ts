import { combineReducers, configureStore } from '@reduxjs/toolkit'
import loginReducer from './loginState'
import userReducer from './userState'
import newProfileReducer from './createProfileState'
import addingReducer from './addingProgram'
import defaultReducer from './defaultDataState'
import programmPageReducer from './programmState'
import studentsReducer from './createStudents'

const rootReducer = combineReducers({
  login: loginReducer,
  user: userReducer,
  newProfile: newProfileReducer,
  addingProg: addingReducer,
  default: defaultReducer,
  programmPage: programmPageReducer,
  students: studentsReducer,
})

const store = configureStore({
  reducer: rootReducer,
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch