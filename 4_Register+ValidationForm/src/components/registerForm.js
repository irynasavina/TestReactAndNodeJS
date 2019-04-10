import React, { Component } from 'react';

import TextInput from '../components/controls/textInput';
import '../components/style.css';
import Ajax from '../utils/ajax';

export default class registerForm extends Component {
    state = {
        login: "",
        name: "",
        password: "",
        confirmPassword: "",
        email: "",
        loginState: { isValid: true, message: "" },
        nameState: { isValid: true, message: "" },
        passwordState: { isValid: true, message: "" },
        confirmPasswordState: { isValid: true, message: "" },
        emailState: { isValid: true, message: "" },
        formErrorMessage: null
    }

    changeLogin = (event) => {
        this.setState({ login: event.target.value });
    }

    changeName = (event) => {
        this.setState({ name: event.target.value });
    }
    
    changePassword = (event) => {
        this.setState({ password: event.target.value });
    }

    changeConfirmPassword = (event) => {
        this.setState({ confirmPassword: event.target.value });
    }
    
    changeEmail = (event) => {
        this.setState({ email: event.target.value });
    }

    clickRegister = async () => {
        let validLogin = TextInput.requiredField(this.state.login);
        let validPassword = TextInput.requiredField(this.state.password);
        let validConfirmPassword = TextInput.requiredField(this.state.confirmPassword);
        if (validConfirmPassword.isValid && this.state.password !== this.state.confirmPassword) {
            validConfirmPassword = { isValid: false, message: "Пароль и подтверждение должны совпадать" }
        }
        let validEmail = TextInput.requiredField(this.state.email);
        if (validEmail.isValid) {
            let reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
            if (!reg.test(this.state.email)) {
                validEmail = { isValid: false, message: "Некорректный e-mail" }
            }
        }
        this.setState({ loginState: validLogin, passwordState: validPassword, confirmPasswordState: validConfirmPassword, emailState: validEmail });
        let validForm = validLogin.isValid && validPassword.isValid && validConfirmPassword.isValid && validEmail.isValid;
        if (validForm) {
            let response = await Ajax.post('register', 'login=' + encodeURIComponent(this.state.login) + '&password=' + encodeURIComponent(this.state.password) +
                '&email=' + encodeURIComponent(this.state.email) + '&name=' + encodeURIComponent(this.state.name));
            let data = JSON.parse(response);
            if (!data.error) {
                if (this.props.onLogin) {
                    this.props.onLogin(data.roles, data.sessionID, data.message);
                }
            } else {
                let message = data.messages.map(function(text, index) {
                    return (
                      <div className='error' key={index}>{text}</div>
                    )
                });
                this.setState({ formErrorMessage: message });
        
            }
        }
    }
    render() {
        return (
            <div className="form">
                {this.state.formErrorMessage}
                <TextInput caption="Логин" required={true} state={this.state.loginState} type="text" value={this.state.login} onChangeValue={this.changeLogin}/>
                <TextInput caption="Пароль" required={true} state={this.state.passwordState} type="password" onChangeValue={this.changePassword}/>
                <TextInput caption="Подтвердите пароль" required={true}  state={this.state.confirmPasswordState} type="password" onChangeValue={this.changeConfirmPassword}/>
                <TextInput caption="Имя" state={this.state.nameState} type="text" onChangeValue={this.changeName}/>
                <TextInput caption="E-mail" state={this.state.emailState} required={true} type="email" onChangeValue={this.changeEmail}/>
                <div className="row">
                    <div></div>
                    <div><input type="button" value="Регистрация" onClick={this.clickRegister}/></div>
                </div>
            </div>
        );
    }
}