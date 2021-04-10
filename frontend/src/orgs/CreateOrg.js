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

        if (userType === 'admin')
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
        else if (userType === 'superadmin')
        {
            return (
                <div>
                    <button type='button' className='create-event-btn' onClick={() => this.setState({eventDialogOpen: true})}>
                        Create New Event Here!
                    </button>
                    <Popup
                        open={this.state.eventDialogOpen}
                        onClose={() => this.handleCancelClick()}
                    >
                        <div className='popup'>
                            <div className='popup-content'>
                                <img src='user.png' alt='User'/>
                                <label className='label'>Event Title:</label>
                                <input type='text' placeholder='Event Title' value={this.state.name} onChange={e => this.setState({name: e.target.value})}/>

                                <label className='label'>Time and Date:</label>
                                <input type='text' placeholder='i.e. 7:00 PM' value={this.state.time} onChange={e => this.setState({time: e.target.value})}/>
                                <input type='date' placeholder='mm-dd-yyyy' value={this.state.date} min='2021-04-04' max='2060-01-01' onChange={e => this.setState({date: e.target.value})}/>

                                <label className='label'>Type of Event:</label>
                                <select placeholder='i.e. Pulbic, Private...' onChange={e => this.setState({type: e.target.value})}>
                                    <option value='Public Event'>Public Event</option>
                                    <option value='Private Event'>Private Event</option>
                                    <option value={userRso}>RSO Event</option>
                                </select>


                                <label className='label'>Event Description:</label>
                                <input type='text' placeholder='Description' value={this.state.desc} onChange={e => this.setState({desc: e.target.value})}/>
                            </div>
                            <div className="row col-md-12">
                                {createEventButton}
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