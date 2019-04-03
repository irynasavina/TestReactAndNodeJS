import React, { Component } from 'react';
import Cookies from 'universal-cookie';

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
    
    changeLogin = (value) => {
        console.log(value);
        this.setState({ login: value });
    }

    changePassword = (value) => {
        console.log(value);
        this.setState({ password: value });
    }

    logonPost = async () => {
        try {
            let response = await Ajax.post('login', 'login=' + encodeURIComponent(this.state.login) + '&password=' + encodeURIComponent(this.state.password));
            let data = JSON.parse(response);
            this.setState({ authorized: !data.error, message: data.message });
            const cookies = new Cookies();
            cookies.set('sessionID', data.sessionID, { path: '/' });
            if (this.props.onLogin) {
                this.props.onLogin(data.roles);
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
            <TextInput type="pasword" caption="Пароль" onChangeValue={this.changePassword}/>
            <div className="row">
                <div></div>
                <div><input type="button" value="Logon" onClick={this.logonPost}/></div>
            </div>
        </div>
        )
    }
}