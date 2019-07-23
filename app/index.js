import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Gui from '@/gui'
import store from '@/store'

ReactDOM.render(
  <Provider store={store}>
    <Gui />
  </Provider>, document.getElementById('root'))
