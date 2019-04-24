import React, { Component } from 'react';

export default class RestorePassword extends Component {
    componentWillMount() {
        let token = this.props.match.params.token;
        console.log(token);
    }

    render() {
        return (<h1>New Password</h1>);
    }
}