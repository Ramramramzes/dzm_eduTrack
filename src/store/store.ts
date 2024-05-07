import { combineReducers, configureStore } from '@reduxjs/toolkit'
import loginReducer from './loginState'
import userReducer from './userState'
import newProfileReducer from './createProfileState'
import dashboardReducer from './dashboardState'

const rootReducer = combineReducers({
  login: loginReducer,
  user: userReducer,
  newProfile: newProfileReducer,
  dashboard: dashboardReducer, 
})

const store = configureStore({
  reducer: rootReducer,
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch