import React from 'react'

class Login extends React.Component {

    state={
        username:'',
        pwd:''
    }

    componentDidMount() {
        document.body.style.backgroundImage = "url('background.png')"
        document.body.style.backgroundSize = 'cover'
    }

    handleChange = (e) => {
        const {name, value} = e.target
        this.setState({[name]:value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
    }

    render() {
        return (
            <div>
                <div>
                   {<img src='logo.png' alt='' className='logo'/>}
                </div>
                <div>
                    <form onSubmit = {this.handleSubmit}>
                        <input className='center' type='username' name='username' placeholder='username...' required onChange={this.handleChange}/>
                        <input className='center' type='password' name='pwd' placeholder='password...' required onChange={this.handleChange}/>
                        <button className='center' onSubmit={this.handleSubmit}>Log In</button>
                    </form>
                </div>
            </div>
        )
    }

}

export default Login;