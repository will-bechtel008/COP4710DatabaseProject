// React will be used to build this js file
// useState will be used to utilizes states within a function
import { React, useState } from "react";

// used for url history
// will help us change url
import { useHistory } from "react-router-dom";

// axios will be used to post and get information from this web apps backend
import Axios from "axios";

// login page
export default function Login() {
  // is used to change urls
  // in the case of this page history is used to go to the home page after performing login
  const history = useHistory();
  
  // stores user input for username
  const [username, inputUsername] = useState();

  // stores uer input for password
  const [password, inputPassword] = useState();

  // login attempt
  const submit = async (e) => {
    try{
      // prevent default
        e.preventDefault();

        // user login information
        // this data will be sent to backend for confirmation
        const user = { username, password };

        // if there is a username and password
        if (username && password)
        {
          // attempt to login to the 
          // the userRoute handles all the validation etc
          const postRequest = "http://localhost:5000/users/login";
          const loginAttempt = await Axios.post(postRequest, user);
      
          // save authentication token to the local storage
          // this signifies to the system that a valid user is logged in
          localStorage.setItem("login_token", loginAttempt.data.token);
      
          // return to homepage
          history.push("/");

          // reload page
          // is used so that buttons are corrected
          // by reseting the buttons in the Button.js file are adjusted
          window.location.reload();
        }

        // error handling
    } catch (err) {
    };
  };
 
  // user input section
  // the user can input a predefined accounts username and password in order to log into the system
  // these must be correct for this to work
  return (
    <div className = "page">
      <h2>User Login</h2>
      <form className = "login_form" onSubmit = {submit}>

        <label htmlFor = "login_username">Username</label>
        <input id = "login_username" type = "username" onChange = { (e) => inputUsername(e.target.value) }/>

        <label htmlFor = "login_password">Password</label>
        <input id = "login_password" type = "password" onChange = { (e) => inputPassword(e.target.value) }/>
        
        <input type = "submit" value = "LOGIN"/>
      </form>
    </div>
  );
}
