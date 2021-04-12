import React from 'react';
import Popup from 'reactjs-popup';
import './Orgs.css'
import axios from 'axios';

type Props = {||};

type State = {|
    universityid: String,
    rsos: Array,
    unis: Array,
    CreateUniDialOpen: boolean,
    CreateRsoDialOpen: boolean,
    JoinUniDialOpen: boolean,
    JoinRsoDialOpen: boolean

    |};

// TODO(me): change api call to match the uni routes
async function createNewUni(userid, eventType, eventName, desc, date) {
    try {
        const postReq = 'http://localhost:5000/event/add';
        const newEvent = await axios.post(postReq, {userid, eventType, eventName, desc, date});
        console.log(newEvent);
        return newEvent;
    }
    catch (err) {};
}

// TODO(me): change api call to match the rso routes
async function createNewRso(userid, eventType, eventName, desc, date) {
    try {
        const postReq = 'http://localhost:5000/event/add';
        const newEvent = await axios.post(postReq, {userid, eventType, eventName, desc, date});
        console.log(newEvent);
        return newEvent;
    }
    catch (err) {};
}

// TODO(me): change api call to match the uni routes
async function joinUni(userid, eventType, eventName, desc, date) {
    try {
        const postReq = 'http://localhost:5000/event/add';
        const newEvent = await axios.post(postReq, {userid, eventType, eventName, desc, date});
        console.log(newEvent);
        return newEvent;
    }
    catch (err) {};
}

// TODO(me): change api call to match the rso routes
async function joinRso(userid, eventType, eventName, desc, date) {
    try {
        const postReq = 'http://localhost:5000/event/add';
        const newEvent = await axios.post(postReq, {userid, eventType, eventName, desc, date});
        console.log(newEvent);
        return newEvent;
    }
    catch (err) {};
}

// get organization info
async function getOrgs() {
    const getReq = 'http://localhost:5000/users/organizations';
    const res = await axios.get(getReq);
    return res;
}
class CreateEvent extends React.Component {

    constructor() {
        super();

        this.state = {
            universityid: '',
            rsos: [],
            unis: [],
            CreateUniDialOpen: false,
            CreateRsoDialOpen: false,
            JoinUniDialOpen: false,
            JoinRsoDialOpen: false
        }
    }

    componentDidMount() {
        getOrgs(res => {
            this.setState({rsos: res.data.rsos});
            this.setState({unis: res.data.universities});
        });
    }

    handleCreateUniClick(): void {
        createNewUni(localStorage.getItem('login_token'), this.state.eventType, this.state.eventName, this.state.desc, this.state.date);
        // window.location.reload();
	};

    handleCreateRsoClick(): void {
        createNewRso(localStorage.getItem('login_token'), this.state.eventType, this.state.eventName, this.state.desc, this.state.date);
        // window.location.reload();
    }

    handleJoinUniClick(): void {
        joinUni(localStorage.getItem('login_token'), this.state.eventType, this.state.eventName, this.state.desc, this.state.date);
        // window.location.reload();
    }

    handleJoinRsoClick(): void {
        joinRso(localStorage.getItem('login_token'), this.state.eventType, this.state.eventName, this.state.desc, this.state.date);
        // window.location.reload();
    }

    handleCancelClick(): void {
		this.setState({eventDialogOpen: false});
	}

    render(): React.Node {
        const userType = localStorage.getItem('userType');

        const createUniButton = (
            <button className='button' onClick={() => this.handleCreateUniClick()}>
                Create a new University
            </button>
        );

        const createRsoButton = (
            <button className='button' onClick={() => this.handleCreateRsoClick()}>
                Create a new RSO
            </button>
        );

        const joinUniButton = (
            <button className='button' onClick={() => this.handleJoinUniClick()}>
                Join a University
            </button>
        );

        const joinRsoButton = (
            <button className='button' onClick={() => this.handleJoinRsoClick()}>
                Join a RSO
            </button>
        );

        const cancelButton = (
            <button className='button' onClick={() => this.handleCancelClick()}>
                Cancel
            </button>
        );

        var options =
        [
        {
            "text"  : "Option 1",
            "value" : "Value 1"
        },
        {
            "text"     : "Option 2",
            "value"    : "Value 2",
            "selected" : true
        },
        {
            "text"  : "Option 3",
            "value" : "Value 3"
        }
        ];

        var selectBox = document.getElementById('rec_mode');

        for(var i = 0, l = this.state.universities.length; i < l; i++){
        var option = this.state.universities[i];
        selectBox.options.add( new Option(option.text, option.value, option.selected) );
        }

        // admin
        // Join Unis    .
        //   .       Create Rso
        if (userType === 'admin')
        {
            return (
                <div>
                    <button className='event_button' onClick={() => this.setState({JoinUniDialOpen: true})}>
                        Join University Here!
                    </button>
                    <Popup
                        open={this.state.JoinUniDialOpen}
                        onClose={() => this.handleCancelClick()}
                    >
                        <div className='popup'>
                            <div className='popup-content'>
                                <img src='uni.png' alt='User'/>
                                <label className='label'>Universities:</label>
                                <select id='rec_mode' onChange={e => this.setState({universityid: e.target.value})}>
                                </select>

                                <label className='label'>Event Description:</label>
                                <input type='text' placeholder='Description' value={this.state.desc} onChange={e => this.setState({desc: e.target.value})}/>
                            </div>
                            <div className="row col-md-12">

                                {cancelButton}
                            </div>
                        </div>
                    </Popup>
                </div>
            )
        }
        // superadmin
        //      .           .
        // Create Uni       .
        else if (userType === 'superadmin')
        {
            return (
                <div>
                    <button className='event_button' onClick={() => this.setState({eventDialogOpen: true})}>
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
                                <input type='text' placeholder='Event Title' value={this.state.eventName} onChange={e => this.setState({eventName: e.target.value})}/>

                                <label className='label'>Date:</label>
                                <input type='date' placeholder='mm-dd-yyyy' value={this.state.date} min='2021-04-04' max='2060-01-01' onChange={e => this.setState({date: e.target.value})}/>

                                <label className='label'>Type of Event:</label>
                                <select placeholder='i.e. Pulbic, Private...' value={this.state.eventType} onChange={e => this.setState({eventType: e.target.value})}>
                                    <option value='public_event'>Public Event</option>
                                    <option value='private_event'>Private Event</option>
                                    <option value='rso_event'>RSO Event</option>
                                </select>


                                <label className='label'>Event Description:</label>
                                <input type='text' placeholder='Description' value={this.state.desc} onChange={e => this.setState({desc: e.target.value})}/>
                            </div>
                            <div className="row col-md-12">

                                {cancelButton}
                            </div>
                        </div>
                    </Popup>
                </div>
            )
        }

        // normal
        // Join Uni    Join Rso
        // .            .
        else
        {
            return (
                <div></div>
            )
        }
    }
}

export default CreateEvent;