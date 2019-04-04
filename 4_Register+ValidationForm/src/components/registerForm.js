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
        email: ""
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

    render() {
        return (
            <div className="form">
                <TextInput caption="Логин" type="text" value={this.state.login} onChangeValue={this.changeLogin}/>
                <TextInput caption="Пароль" type="password" onChangeValue={this.changePassword}/>
                <TextInput caption="Подтвердите пароль" type="password" onChangeValue={this.changeConfirmPassword}/>
                <TextInput caption="Имя" type="text" onChangeValue={this.changeName}/>
                <TextInput caption="E-mail" type="email" onChangeValue={this.changeEmail}/>
                <div className="row">
                    <div></div>
                    <div><input type="button" value="Регистрация" onClick={this.clickRegister}/></div>
                </div>
            </div>
        );
    }
}