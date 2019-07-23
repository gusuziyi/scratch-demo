import { createStore, combineReducers } from 'redux'
import vmReducer, { vmState } from './vm'
let reducer = combineReducers({
  vm: vmReducer
})
let initialState = {
  vm: vmState
}
const store = createStore(reducer, initialState)
export default store
