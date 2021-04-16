import React from 'react';
import Popup from 'reactjs-popup';
import './Orgs.css'
import axios from 'axios';

type Props = {||};

type State = {|
    userId: String,
    name: String,
    time: String,
    date: String,
    org: String,
    eventDialogOpen: boolean
    |};


async function createNewOrg(userid, orgType, orgName, lat, lng) {
    try {
        const uni = 'http://localhost:5000/university/add';
        const rso = 'http://localhost:5000/rso/add';
        let path = '';
        if (orgType === 'uni') {
            path = uni;
        }
        else {
            path = rso;
        }
        const newOrg = await axios.post(path, {userid, orgType, orgName, lat, lng});
        console.log(newOrg);
        return newOrg;
    }
    catch (err) {
    };
}
class CreateOrg extends React.Component {

    constructor() {
        super();

        this.state = {
            orgType: '',
            orgName:'',
            desc: '',
            lat: 0,
            lng: 0,
            orgDialogOpen: false
        }
    }

    handleCreateOrgClick(): void {
        createNewOrg(localStorage.getItem('login_token'), this.state.orgType, this.state.orgName, this.state.lat, this.state.lng);
        window.location.reload();
	};

    handleCancelClick(): void {
		this.setState({orgDialogOpen: false});
	}

    render(): React.Node {
        const userType = localStorage.getItem('userType');
        const createOrgButton = (
            <button className='button' onClick={() => this.handleCreateOrgClick()}>
                Create Organization
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
                    <button className='event_button' onClick={() => this.setState({orgDialogOpen: true})}>
                        Create a New Organization Here!
                    </button>
                    <Popup
                        open={this.state.eventDialogOpen}
                        onClose={() => this.handleCancelClick()}
                    >
                        <div className='popup'>
                            <div className='popup-content'>
                                <img src='user.png' alt='User'/>
                                <label className='label'>Organization Name:</label>
                                <input type='text' placeholder='Organization Name' value={this.state.orgName} onChange={e => this.setState({orgName: e.target.value})}/>

                                <label className='label'>Type of Organization:</label>
                                <select placeholder='University or Rso' value={this.state.orgType} onChange={e => this.setState({orgType: e.target.value})}>
                                    <option value='uni'>University</option>
                                    <option value='rso'>RSO</option>
                                </select>

                                <label className='label'>Latitude:</label>
                                <input type='text' placeholder='lat' value={this.state.lat} onChange={e => this.setState({lat: e.target.value})}/>
                                <label className='label'>Longitude</label>
                                <input type='text' placeholder='lng' value={this.state.lng} onChange={e => this.setState({lng: e.target.value})}/>

                                {/* <label className='label'>Organization Description:</label>
                                <input type='text' placeholder='Description' value={this.state.desc} onChange={e => this.setState({desc: e.target.value})}/> */}
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
            <div>
                <br/><br/><br/><br/><br/><br/>
            </div>
        )
        }
    }
}

export default CreateOrg;