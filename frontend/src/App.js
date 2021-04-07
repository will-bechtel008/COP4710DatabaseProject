import './App.css';
import {React, useEffect, useState} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Login from './login/Login.js'
import Events from './events/Events.js'
import Orgs from './orgs/Orgs.js'
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

          // const getUserInfo = "http://localhost:5000/userinfo/"
          const getOrgs = "http://localhost:5000/users/organizations";
          // const getEvents =  "http://localhost:5000/users/events";

          if (token !== '') {
            // gets user data from system
            //const userCheck = await Axios.get(getUserInfo, { headers: { "login_token": token }});
            const orgsCheck = await Axios.get(getOrgs);
           // const eventsCheck = await Axios.get(getEvents, { userid: userCheck.data.userid });
            // console.log("token: ", token);
            // console.log("user: ", userCheck.data);
            // console.log("orgs: ", orgsCheck.data);
            // console.log("events: ", eventsCheck.data);

              // this sets the userdata for the session to the information retrieved from the backend of the system
              setUserData({ token, orgs: orgsCheck.data});
              // setUserData({ token, user: userCheck.data, orgs: orgsCheck.data, events: eventsCheck.data });
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
                      <Route exact path = "/events" component = {Events} />
                      <Route exact path = "/orgs" component = {Orgs} />
                  </Switch>
          </UserSession.Provider>
      </BrowserRouter>
  </>;
}