//import React, { Component } from 'react';

import '../style.css';

import TextInput from '../controls/textInput';

export default class emailInput extends TextInput {
    static checkEmailFormat(value) {
        let reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
        if (!reg.test(value)) {
            return { isValid: false, message: "Некорректный e-mail" }
        }
        return { isValid: true, message: "" }
    }

}