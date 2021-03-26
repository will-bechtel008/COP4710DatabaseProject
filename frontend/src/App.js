import './App.css';
import * as React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Login from './auth/Login.js'
import Events from './events/Events.js'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Login}/>
          <Route exact path='/Events' component={Events}/>
        </Switch>
      </BrowserRouter>
    </div>
  )
}



export default App;
