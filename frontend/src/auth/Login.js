import React from 'react'

export default class Login extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            username:'',
            password: '',
        }
    }

    handleChange = (e) => {
        const {name, value} = e.target
        this.setState({[name]:value})
    }

    handleSubmit = (e) => {

    }

    render() {
        return (
            <div>
                <div>
                    Log In
                </div>
                <div>
                    <form onSubmit = {this.handleSubmit}>
                        <input
                            type='username'
                            name='username'
                            placeholder='username...'
                            required
                            onChange = {this.handleChange}
                            />
                        <input
                            type='password'
                            name='password'
                            placeholder='password...'
                            required
                            onChange = {this.handleChange}
                            />
                        <button onSubmit={this.handleSubmit}>Log In</button>
                    </form>
                </div>
            </div>
        )
    }
}