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


async function createNewUni(userid, name, location, desc) {
    try {
        console.log("createNewUni")
        const path = 'http://localhost:5000/university/add';
        const newOrg = await axios.post(path, {userid, name, location, desc});
        console.log("new org: ", newOrg)
        return newOrg;
    }
    catch (err) {
    };
}


async function createNewRso(userid, name, location) {
    try {
        const path = 'http://localhost:5000/rso/add';
        const newOrg = await axios.post(path, {userid, name, location});
        console.log("new org: ", newOrg)
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
            location: '',
            desc: '',
            orgDialogOpen: false
        }
    }

    handleCreateOrgClick(): void {
        console.log(this.state.orgName);
        console.log(this.state.location);
        console.log(this.state.desc);
        console.log(this.state.orgType);
        if (this.state.orgType === 'uni')
            createNewUni(localStorage.getItem('login_token'), this.state.orgName, this.state.location, this.state.desc);
        else {
            createNewRso(localStorage.getItem('login_token'), this.state.orgName, this.state.location)
        }
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
                        open={this.state.orgDialogOpen}
                        onClose={() => this.handleCancelClick()}
                    >
                        <div className='popup'>
                            <div className='popup-content'>
                                <img src='user.png' alt='User'/>
                                <label className='label'>Organization Name:</label>
                                <input type='text' placeholder='Organization Name' value={this.state.orgName} onChange={e => this.setState({orgName: e.target.value})}/>

                                <label className='label'>Type of Organization:</label>
                                {userType === 'superadmin' ? <select placeholder='University' value={this.state.orgType} onChange={e => this.setState({orgType: e.target.value})}> <option value=''>default</option><option value='uni'>University</option> </select> : <select placeholder='Rso' value={this.state.orgType} onChange={e => this.setState({orgType: e.target.value})}> <option value=''>default</option><option value='rso'>RSO</option> </select>}

                                {userType === 'superadmin' ? <label className='label'>University Description:</label>  : <br/>}
                                {userType === 'superadmin' ? <input type='text' placeholder='Description' value={this.state.desc} onChange={e => this.setState({desc: e.target.value})}/> : <br/>}

                                <label className='label'>Location:</label>
                                <input type='text' placeholder='City, State' value={this.state.location} onChange={e => this.setState({location: e.target.value})}/>
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