//@flow strict

import * as React from 'react';
import './Login.css';
import LoginPopup from './LoginPopup.js';
import SignupPopup from './SignupPopup.js';
import ResendEmailPopup from './ResendEmailPopup.js';
// import { verifyLogin } from '../globalComponents/apiCalls/verifyLogin.js';

// Main login page. Front-page of Fortuna.
class Login extends React.Component<{||}> {

	constructor() {
		super();
    verifyLogin();
	}

	onEmailRegistered(registeredUsername: string, registeredPassword: string): void {
		this.refs.loginPopup.onEmailRegistered(registeredUsername, registeredPassword);
  }

  componentDidMount() {
    document.body.style.backgroundImage = "url('/events.png')"
    document.body.style.fontFamily = "font-family: 'Press Start 2P', cursive;"
  }

	render(): React.Node {




		return (
			<div>
				<div className="column loginleft align-middle">
				</div>
				<div className="column loginmiddle">
					<h1>FORTUNA</h1>
					{/*<h6>Welcome Commander</h6>*/}
					<br />
					<br />
					<br />
					<br />

					<div className="middlecolumn">
						<LoginPopup ref="loginPopup" />
						<br/>
						<SignupPopup
							onEmailRegisteredCallback={(email: string, password: string) => this.onEmailRegistered(email, password)}
						/>
						<br/>
						<ResendEmailPopup/>
					</div>
				</div>
        <div className="footer">
          <p>Photo credit: <a href="https://www.artstation.com/artwork/GXwZgz">ArtStation</a></p>
        </div>
			</div>
		);
	}
}

export default Login;
