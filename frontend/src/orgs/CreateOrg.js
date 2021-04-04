import React from 'react';
import Popup from 'reactjs-popup';
import './Orgs.css'

// User info api (?)
import getUser from '../globalComponents/apiCalls/getUser.js';

type Props = {||};

type State = {|
    userId: String,
    name: String,
    location: String,
    orgDialogOpen: boolean
    |};

class CreateOrg extends React.Component {

    constructor() {
        super();

        this.state = {
            userId: '',
            name:'',
            location: '',
            orgDialogOpen: false
        }
    }

    handleCreateOrgClick(): void {

		const responsePromise: Promise<Response> = fetch('/api/org', {
			method: 'POST',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Credentials': 'true'
			},
			body: JSON.stringify({ name: this.state.name, location: this.state.location}),
		});
		responsePromise.then(
			response => response.json().then(data => {
				if (response.status !== 200) {
					console.log(response.status);
					console.log(data);
				}
				else {
                    // need to fix
					// setLoginToken(data.token);
					// window.location=verifyLink('/MainMenu');
				}
			})
		).catch(
			(error) => {
				console.error('Could not connect to server!');
				console.log(error);
			}
		);
	};

    handleCancelClick(): void {
		this.setState({orgDialogOpen: false});
	}

    render(): React.Node {
        const userType = 'admin'
        const userRso = 'blah supremacy'

        const createOrgButton = (
            <button className='button' onClick={() => this.handleCreateOrgClick()}>
                Create Org
            </button>
        );

        const cancelButton = (
            <button className='button' onClick={() => this.handleCancelClick()}>
                Cancel
            </button>
        );

        if (userType === 'admin' || userType === 'superadmin')
        {
            return (
                <div>
                    <button type='button' className='create-org-btn' onClick={() => this.setState({orgDialogOpen: true})}>
                        Create New Org Here!
                    </button>
                    <Popup
                        open={this.state.orgDialogOpen}
                        onClose={() => this.handleCancelClick()}
                    >
                        <div className='popup'>
                            <div className='popup-content'>
                                <img src='user.png' alt='User'/>
                                <label className='label'>Org Title:</label>
                                <input type='text' placeholder='Org Title' value={this.state.name} onChange={e => this.setState({name: e.target.value})}/>

                                <label className='label'>Location:</label>
                                <input type='text' placeholder='i.e. Orlando' value={this.state.location} onChange={e => this.setState({location: e.target.value})}/>
                                
                                <label className='label'>Type of Org:</label>
                                <select placeholder='University or RSO' onChange={e => this.setState({type: e.target.value})}>
                                    <option value='University'>University</option>
                                    <option value='RSO'>RSO</option>
                                </select>

                                <label className='label'>Org Description:</label>
                                <input type='text' placeholder='Description' value={this.state.desc} onChange={e => this.setState({desc: e.target.value})}/>
                            </div>
                            <div className="row col-md-12">
                                {createOrgButton}
                                {cancelButton}
                            </div>
                        </div>
                    </Popup>
                </div>
            )
        }
        else
        {
        return (
            <div></div>
        )
        }
    }
}

export default CreateOrg;