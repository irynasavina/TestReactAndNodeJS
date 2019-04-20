import React, { Component } from 'react';

import '../components/style.css';
import EmailInput from '../components/controls/emailInput';
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
        let validEmail = EmailInput.requiredField(this.state.email);
        if (validEmail.isValid) {
            validEmail = EmailInput.checkEmailFormat(this.state.email);
        }
        this.setState({  emailState: validEmail });
        if (validEmail.isValid) {
            let response = await Ajax.post('forgot-password', 'email=' + encodeURIComponent(this.state.email));
            let data = JSON.parse(response);
            if (!data.error) {
                console.log(data);
                this.setState({ isComplete: true })
            } else {
                this.setState({ formErrorMessage: <div className='error'>{data.message}</div> });
            }        
        }
    }

    getSendEmailForm() {
        return (
            <div>
                <div>Введите e-mail адрес, который Вы указали при регистрации. Вам буду отправлены инструкции по восстановлению пароля</div>
                <div className="form">
                    {this.state.formErrorMessage}
                    <EmailInput caption="E-mail" state={this.state.emailState} required={true} type="email" onChangeValue={this.changeEmail}/>
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