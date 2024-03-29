import React from 'react';
import Popup from 'reactjs-popup';
import './Events.css'
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

// API call to create a new event
async function createNewEvent(userid, eventType, eventName, desc, date, latitude, longitude) {
    try {
        const postReq = 'http://localhost:5000/event/add';
        const newEvent = await axios.post(postReq, {userid, eventType, eventName, desc, date, longitude, latitude});
        console.log('newEvent: ', newEvent);
        return newEvent;
    }
    catch (err) {
    };
}
class CreateEvent extends React.Component {

    constructor() {
        super();

        this.state = {
            eventType: '',
            eventName:'',
            desc: '',
            date:'',
            lat: '',
            lng: '',
            eventDialogOpen: false
        }
    }

    handleCreateEventClick(): void {
        createNewEvent(localStorage.getItem('login_token'), this.state.eventType, this.state.eventName, this.state.desc, this.state.date, this.state.lat, this.state.lng);
        window.location.reload();
	};

    handleCancelClick(): void {
		this.setState({eventDialogOpen: false});
	}

    render(): React.Node {
        const userType = localStorage.getItem('userType');
        const createEventButton = (
            <button className='button' onClick={() => this.handleCreateEventClick()}>
                Create Event
            </button>
        );

        const cancelButton = (
            <button className='button' onClick={() => this.handleCancelClick()}>
                Cancel
            </button>
        );

        // Only admins and supers can create events
        if (userType === 'admin' || userType === 'superadmin')
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
                                    <option value=''>Default</option>
                                    <option value='public_event'>Public Event</option>
                                    <option value='private_event'>Private Event</option>
                                    <option value='rso_event'>RSO Event</option>
                                </select>

                                <label className='label'>Latitude:</label>
                                <input type='text' placeholder='lat' value={this.state.lat} onChange={e => this.setState({lat: e.target.value})}/>
                                <label className='label'>Longitude</label>
                                <input type='text' placeholder='lng' value={this.state.lng} onChange={e => this.setState({lng: e.target.value})}/>

                                <label className='label'>Event Description:</label>
                                <input type='text' placeholder='Description' value={this.state.desc} onChange={e => this.setState({desc: e.target.value})}/>
                            </div>
                            <div className="row col-md-12">
                            <br/><br/><br/>
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
            <div>
                <br/><br/><br/><br/><br/><br/>
            </div>
        )
        }
    }
}

export default CreateEvent;