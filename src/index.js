import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter as Router } from 'react-router-dom'

import { Provider } from 'react-redux'
import { store, persistor } from './app/store'
import { PersistGate } from 'redux-persist/integration/react'

import App from './components/App'
import './index.scss'
ReactDOM.render(
   <React.StrictMode>
      <Provider store={store}>
         <PersistGate loading={null} persistor={persistor}>
            <Router>
               <App />
            </Router>
         </PersistGate>
      </Provider>
   </React.StrictMode>,
   document.getElementById('root')
)
