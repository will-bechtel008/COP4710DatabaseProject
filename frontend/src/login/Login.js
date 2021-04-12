// useState will be used to utilizes states within a function
import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import './Login.css'

export default function Login() {
  const history = useHistory();

  const [username, inputUsername] = useState();

  const [password, inputPassword] = useState();

  const onClick = () => {
    window.location = '/register'
  }

  // login attempt
  const submit = async (e) => {
    try{
        e.preventDefault();

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

    } catch (err) {
    };
  };

  return (
    <div className = "center">
      <h2 className='center'>User Login</h2>
      <form className = "center" onSubmit = {submit}>

        <label className='center' htmlFor = "login_username">Username</label>
        <input id = "login_username" type = "username" onChange = { (e) => inputUsername(e.target.value) }/>
        <br></br>
        <label className='center' htmlFor = "login_password">Password</label>
        <input id = "login_password" type = "password" onChange = { (e) => inputPassword(e.target.value) }/>
        <br></br>
        <input className='login' type = "submit" value = "LOGIN"/>
      </form >
      Don't have an Account? 
      <button className='btn' onClick={() => onClick()}>
        Sign Up.
      </button>
    </div>
  );
}
