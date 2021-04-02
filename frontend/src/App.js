import './App.css';
import * as React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Login from './login/Login.js'
import Events from './events/Events.js'
import Orgs from './orgs/Orgs.js'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Orgs}/>
          <Route exact path='/Events' component={Login}/>
          <Route exact path='/Orgs' component={Events}/>
        </Switch>
      </BrowserRouter>
    </div>
  )
}



export default App;
