import React, { Component } from 'react';

import TextInput from '../components/controls/textInput';
import '../components/style.css';
import Ajax from '../utils/ajax';

export default class registerForm extends Component {
    state = {
        password: "",
        confirmPassword: "",
        passwordState: { isValid: true, message: "" },
        confirmPasswordState: { isValid: true, message: "" },
    }

    changePassword = (event) => {
        this.setState({ password: event.target.value });
    }

    changeConfirmPassword = (event) => {
        this.setState({ confirmPassword: event.target.value });
    }

    clickUpdate = async () => {
        let validPassword = TextInput.requiredField(this.state.password);
        let validConfirmPassword = TextInput.requiredField(this.state.confirmPassword);
        if (validConfirmPassword.isValid && this.state.password !== this.state.confirmPassword) {
            validConfirmPassword = { isValid: false, message: "Пароль и подтверждение должны совпадать" }
        }
        this.setState({ passwordState: validPassword, confirmPasswordState: validConfirmPassword });
        let validForm = validPassword.isValid && validConfirmPassword.isValid;
        if (validForm) {
            let response = await Ajax.post('update-password', 'password=' + encodeURIComponent(this.state.password));
            console.log(response);
        }
    }

    render() {
        return (
            <div className="form">
                {this.state.formErrorMessage}
                <TextInput caption="Пароль" required={true} state={this.state.passwordState} type="password" onChangeValue={this.changePassword}/>
                <TextInput caption="Подтвердите пароль" required={true}  state={this.state.confirmPasswordState} type="password" onChangeValue={this.changeConfirmPassword}/>
                <div className="row">
                    <div></div>
                    <div><input type="button" value="Обновить" onClick={this.clickUpdate}/></div>
                </div>
            </div>
        );
    }
}