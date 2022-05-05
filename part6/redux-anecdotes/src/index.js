import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from "./store";

import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <Provider> component from react-redux library makes the Redux store available
  // to any nested components that need to access the Redux store.
  <Provider store={store}>
    <App />
  </Provider>
)
