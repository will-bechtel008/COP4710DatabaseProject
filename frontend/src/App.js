import './App.css';
import {React, useEffect, useState} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Login from './login/Login.js'
import Register from './login/Register.js'
import Events from './events/Events.js'
import Orgs from './orgs/Orgs.js'
import Map from './events/Map.js'
import Comments from './events/Comments.js'
import UserSession from './session/UserSession';
import Axios from 'axios'

export default function App() {
  // default user info when system is running
  const [userData, setUserData] = useState({ token: undefined, user: 0 });

  // check if user is logged in
  useEffect(() => {
      const checkLoginStatus = async () => {
          // get login token
          let token = localStorage.getItem("login_token");

          // if token does not exist make empty token
          if (token == null)
          {
              // create variable in local storage
              localStorage.setItem("login_token", "")

              // set token in this useEffect to emty string
              token = "";
          }
        };

      // perform check
      checkLoginStatus();
  }, []);

  // this actually "creates" the app
  // this section connects each of the routes that the app handles and connectes them with their respective components
  return <>
      <BrowserRouter>
          <UserSession.Provider value = {{ userData, setUserData }}>
                  <Switch>
                      <Route exact path = "/" component = {Login} />
                      <Route exact path = "/register" component = {Register} />
                      <Route exact path = "/events" component = {Events} />
                      <Route exact path = "/orgs" component = {Orgs} />
                      <Route exact path = "/Map" component = {Map} />
                      <Route exact path = "/comments" component = {Comments} />
                  </Switch>
          </UserSession.Provider>
      </BrowserRouter>
  </>;
}