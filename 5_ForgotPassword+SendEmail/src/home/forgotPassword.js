import React, { Component } from 'react';

import '../components/style.css';
import TextInput from '../components/controls/textInput';
import Ajax from '../utils/ajax';

export default class ForgotPassword extends Component {
    state = {
        email: "",
        emailState: { isValid: true, message: "" },
        formErrorMessage: null,
        isComplete: false
    }

    changeEmail = (event) => {
        this.setState({ email: event.target.value });
    }

    clickSend= async () => {
        let validEmail = TextInput.requiredField(this.state.email);
        if (validEmail.isValid) {
            let reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
            if (!reg.test(this.state.email)) {
                validEmail = { isValid: false, message: "Некорректный e-mail" }
            }
        }
        this.setState({  emailState: validEmail });
        if (validEmail.isValid) {
            let response = await Ajax.post('forgot-password', 'email=' + encodeURIComponent(this.state.email));
            let data = JSON.parse(response);
            if (!data.error) {
                console.log(data);
                this.setState({ isComplete: true })
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

    getSendEmailForm() {
        return (
            <div>
                <div>Введите e-mail адрес, который Вы указали при регистрации. Вам буду отправлены инструкции по восстановлению пароля</div>
                <div className="form">
                    {this.state.formErrorMessage}
                    <TextInput caption="E-mail" state={this.state.emailState} required={true} type="email" onChangeValue={this.changeEmail}/>
                    <div className="row">
                        <div></div>
                        <div><input type="button" value="Отослать" onClick={this.clickSend}/></div>
                    </div>
                </div>
            </div>
        )
    }

    getComplete() {
        return (
            <div>Проверьте Ваш e-mail и следуйте инструкциям</div>
        )
    }

    render() {
        return (
            <div className="home">
                {this.state.isComplete? this.getComplete() : this.getSendEmailForm()}
            </div>
        )
    }
}