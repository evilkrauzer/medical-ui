import { combineReducers } from 'redux'
import userApp from './userApp'
import studies from './studies' 

export default combineReducers({
  userApp,
  studies
})