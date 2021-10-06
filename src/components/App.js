import { Switch, Route } from 'react-router-dom'

import UserSelect from './Pages/UserSelectPage/UserSelect'
import Gamepage from './Pages/GamePage/Gamepage'
import './app.scss'
const App = () => {
   return (
      <section className='body'>
         <Switch>
            <Route path='/' exact component={UserSelect} />
            <Route path='/play' exact component={Gamepage} />
         </Switch>
      </section>
   )
}
export default App
