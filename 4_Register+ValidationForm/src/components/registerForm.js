import React, { Component } from 'react';

import TextInput from '../components/controls/textInput';
import '../components/style.css';

export default class registerForm extends Component {
    render() {
        return (
            <div className="form">
                <TextInput caption="Логин" type="text"/>
                <TextInput caption="Пароль" type="password"/>
                <TextInput caption="Подтвердите пароль" type="password"/>
                <TextInput caption="E-mail" type="email"/>
                <div className="row">
                    <div></div>
                    <div><input type="button" value="Регистрация"/></div>
                </div>
            </div>
        );
    }
}