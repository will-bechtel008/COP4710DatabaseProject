import { React, useState } from "react";

import { useHistory } from "react-router-dom";

import Axios from "axios";

export default function Register() {
  const history = useHistory();
  const [username, inputUsername] = useState();
  const [password, inputPassword] = useState();
  const [type, inputType] = useState();

  const submit = async (e) => {
    try{
        e.preventDefault();

        const user = { username, password, type };

        if (username && password && type)
        {
          const postRequest = "http://localhost:5000/users/add";
          const createAttempt = await Axios.post(postRequest, user);

          history.push("/");

          window.location = '/';

        }

    } catch (err) {
    };
  };

  return (
    <div className = "page">
      <h2>Registration</h2>
      <form className = "login_form" onSubmit = {submit}>

        <label htmlFor = "login_username">Username</label>
        <input id = "login_username" type = "username" onChange = { (e) => inputUsername(e.target.value) }/>

        <label htmlFor = "login_password">Password</label>
        <input id = "login_password" type = "password" onChange = { (e) => inputPassword(e.target.value) }/>

        <label className='label'>User Type:</label>
          <select type ='type' onChange={(e) => inputType(e.target.value) }>
              <option value='normal'>Normal User</option>
              <option value='admin'>Admin</option>
              <option value='superadmin'>Super Admin</option>
          </select>

        <input type = "submit" value = "REGISTER"/>
      </form>
    </div>
  );
}
