import { createStore, combineReducers } from 'redux'
import vmReducer, { vmState } from './vm'
import srcSourceReducer, { srcSourceState } from './srcSource'

let reducer = combineReducers({
  vm: vmReducer,
  srcSourceList: srcSourceReducer
})
let initialState = {
  vm: vmState,
  srcSourceList: srcSourceState
}
const store = createStore(reducer, initialState)
export default store
