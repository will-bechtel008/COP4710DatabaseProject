import './App.css';
import * as React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Login from './auth/Login.js'
import Events from './events/Events.js'
import Orgs from './orgs/Orgs.js'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Login}/>
          <Route exact path='/Events' component={Events}/>
          <Route exact path='/Orgs' component={Orgs}/>
        </Switch>
      </BrowserRouter>
    </div>
  )
}



export default App;
