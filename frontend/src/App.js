import * as React from 'react';
import './App.css';
import Login from './auth/Login.js'
import Events from './events/Events.js'
import Org from './org/Org.js'
import { BrowserRouter, Route } from 'react-router-dom';

class App extends React.Component {
  render(): React.Node {
    return (
      <BrowserRouter>
        <Route path='/' exact component={Login} />
        <Route path='/Events' exact component={Events} />
        <Route path='/Org' exact component={Org} />
      </BrowserRouter>
    )
  }
}

export default App;
