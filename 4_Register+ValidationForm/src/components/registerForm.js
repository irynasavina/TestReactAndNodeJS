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

    requiredField = (field) => {
        if (field == '') {
            return { isValid: false, message: "Обязательное поле" };
        }
        return { isValid: true, message: "" }
    }

    clickRegister = async () => {
        let validLogin = this.requiredField(this.state.login);
        let validPassword = this.requiredField(this.state.password);
        let validConfirmPassword = this.requiredField(this.state.confirmPassword);
        if (validConfirmPassword.isValid && this.state.password != this.state.confirmPassword) {
            validConfirmPassword = { isValid: false, message: "Пароль и подтверждение должны совпадать" }
        }
        let validEmail = this.requiredField(this.state.email);
        if (validEmail.isValid) {
            let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            console.log(reg.test(this.state.email));
            if (!reg.test(this.state.email)) {
                console.log(111);
                validEmail = { isValid: false, message: "Некорректный e-mail" }
                console.log(validEmail);
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
            }
            console.log(response);
        }
    }
    render() {
        return (
            <div className="form">
                <TextInput caption="Логин" required={true} state={this.state.loginState} type="text" value={this.state.login} onChangeValue={this.changeLogin}/>
                <TextInput caption="Пароль" required={true} state={this.state.passwordState} type="password" onChangeValue={this.changePassword}/>
                <TextInput caption="Подтвердите пароль" required={true}  state={this.state.confirmPasswordState} type="password" onChangeValue={this.changeConfirmPassword}/>
                <TextInput caption="Имя" state={this.state.nameState} type="text" onChangeValue={this.changeName}/>
                <TextInput caption="E-mail" state={this.state.emailState} required={true} state={this.state.emailState} type="email" onChangeValue={this.changeEmail}/>
                <div className="row">
                    <div></div>
                    <div><input type="button" value="Регистрация" onClick={this.clickRegister}/></div>
                </div>
            </div>
        );
    }
}