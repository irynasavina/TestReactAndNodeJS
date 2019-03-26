import React, { Component } from 'react';
import Ajax from '../utils/ajax';

export default class login extends Component {
    state = {
        login: "", 
        password: ""
    }
    
    changeLogin = (event) => {
        this.setState({ login: event.target.value });
    }

    changePassword = (event) => {
        this.setState({ password: event.target.value });
    }

    logonPost = async () => {
        try {
            let response= await Ajax.post('login', 'login=' + encodeURIComponent(this.state.login) + '&password=' + encodeURIComponent(this.state.password));
            console.log('ok');
            console.log(response)
        } catch (error) {
            console.log('error');
            console.log(error)
        }
    }
    
    render() {
        return (
        <div>
            <div>
                <label>Login:<br/><input type="text" value={this.state.login} onChange={this.changeLogin}/></label>
            </div>
            <div>
                <label>Password:<br/><input type="password" value={this.state.password} onChange={this.changePassword}/></label>
            </div>
            <div>
                <input type="button" value="Logon POST" onClick={this.logonPost}/>
            </div>
        </div>
        )
    }
}