import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Ajax from '../utils/ajax';
import TextInput from '../components/controls/textInput';
import '../components/style.css';

export default class login extends Component {
    state = {
        login: "", 
        password: "",
        authorized: null,
        message: "",
        loginState: { isValid: true, message: "" },
        passwordState: { isValid: true, message: "" },
        redirectToForgotPassword: false
    }
    
    changeLogin = (event) => {
        this.setState({ login: event.target.value });
    }

    changePassword = (event) => {
        this.setState({ password: event.target.value });
    }

    logonPost = async () => {
        let validLogin = TextInput.requiredField(this.state.login);
        let validPassword = TextInput.requiredField(this.state.password);
        this.setState({ loginState: validLogin, passwordState: validPassword });
        if (validLogin.isValid && validPassword.isValid) {
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
    }

    forgotPassword = () => {
        this.setState({ redirectToForgotPassword: true })
      }

    render() {
        let authorizedStatus = null;
        if (this.state.authorized != null) {
            let className = (!this.state.authorized)? "error" : "success";
            authorizedStatus = (
                <span className={className}>{this.state.message}</span>
            )
        }
        let rediredtToForgotPassword = null;
        if (this.state.redirectToForgotPassword) {
            rediredtToForgotPassword = (<Redirect to='/forgotPassword' />);
        }
        return (
        <div>
            <div>{authorizedStatus}</div>
            <TextInput type="text" required={true} caption="Логин" state={this.state.loginState} onChangeValue={this.changeLogin}/>
            <TextInput type="password" required={true} caption="Пароль" state={this.state.passwordState} onChangeValue={this.changePassword}/>
            <div className="row">
                <div></div>
                <div>
                    <input type="button" value="Logon" onClick={this.logonPost}/>
                    {rediredtToForgotPassword}
                    <input type="button" value="Забыл пароль?" onClick={this.forgotPassword} />
                </div>
            </div>
        </div>
        )
    }
}