import React, { Component } from 'react';

import Ajax from '../utils/ajax';
import TextInput from '../components/controls/textInput';
import '../components/style.css';

export default class login extends Component {
    state = {
        login: "", 
        password: "",
        authorized: null,
        message: ""
    }
    
    changeLogin = (event) => {
        this.setState({ login: event.target.value });
    }

    changePassword = (event) => {
        this.setState({ password: event.target.value });
    }

    logonPost = async () => {
        try {
            let response = await Ajax.post('login', 'login=' + encodeURIComponent(this.state.login) + '&password=' + encodeURIComponent(this.state.password));
            let data = JSON.parse(response);
            this.setState({ authorized: !data.error, message: data.message });
            if (this.props.onLogin) {
                this.props.onLogin(data.roles, data.sessionID, data.message);
            }
        } catch (error) {
            console.error(error)
        }
    }
    
    render() {
        let authorizedStatus = null;
        if (this.state.authorized != null) {
            let className = (!this.state.authorized)? "error" : "success";
            authorizedStatus = (
                <span className={className}>{this.state.message}</span>
            )
        }
        return (
        <div>
            <div>{authorizedStatus}</div>
            <TextInput type="text" caption="Логин" onChangeValue={this.changeLogin}/>
            <TextInput type="password" caption="Пароль" onChangeValue={this.changePassword}/>
            <div className="row">
                <div></div>
                <div><input type="button" value="Logon" onClick={this.logonPost}/></div>
            </div>
        </div>
        )
    }
}