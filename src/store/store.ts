import { combineReducers, configureStore } from '@reduxjs/toolkit'
import loginReducer from './loginState'
import userReducer from './userState'
import newProfileReducer from './createProfileState'
import dashboardReducer from './dashboardState'
import popupReducer from './popupState'
import defaultReducer from './defaultDataState'

const rootReducer = combineReducers({
  login: loginReducer,
  user: userReducer,
  newProfile: newProfileReducer,
  dashboard: dashboardReducer, 
  popup: popupReducer,
  default: defaultReducer,
})

const store = configureStore({
  reducer: rootReducer,
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch