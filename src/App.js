import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import PageIndex from './components/PageIndex'
import GamePage from './components/GamePage'
import './scss/index.scss'
import './scss/wavy.scss'
import './scss/button.scss'
import './scss/gamepage.scss'

function App() {
   return (
      <Router>
         <Switch>
            <Route path='/' exact component={PageIndex} />
            <Route path='/game' exact component={GamePage} />
         </Switch>
         <ToastContainer position='top-center' draggable pauseOnFocusLoss />
      </Router>
   )
}

export default App
