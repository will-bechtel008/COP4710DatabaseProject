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

  const onClick = () => {
    window.location = '/register'
  }

  // login attempt
  const submit = async (e) => {
    try{
      // prevent default
        e.preventDefault();

        // user login information
        const user = { username, password };

        if (username && password)
        {
          const postRequest = "http://localhost:5000/users/login";
          const loginAttempt = await Axios.post(postRequest, user);

          localStorage.setItem("login_token", loginAttempt.data.userid);
          localStorage.setItem("userType", loginAttempt.data.userType);
          console.log("local storage: ", localStorage.getItem('login_token'));
          console.log("local storage: ", localStorage.getItem('userType'));

          history.push("/");

          window.location = '/events';

        }

        // error handling
    } catch (err) {
    };
  };

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
      Don't have an Account? 
      <button onClick={() => onClick()}>
        Sign Up.
      </button>
    </div>
  );
}
