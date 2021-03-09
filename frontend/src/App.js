import * as React from 'react';
import './App.css';
import Login from './auth/Login.js'
import { BrowserRouter, Route } from 'react-router-dom';

class App extends React.Component {
  render(): React.Node {
    return (
      <BrowserRouter>
        <Route path='/' exact component={Login} />
        {/* <Route path='' exact component={} />
        <Route path='' exact component={} /> */}
      </BrowserRouter>
    )
  }
}

export default App;
