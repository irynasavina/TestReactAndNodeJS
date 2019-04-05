import React, { Component } from 'react';

import '../style.css';

export default class textInput extends Component {
    
    render() {
        let errorMessage = null;
        if (this.props.state != undefined && this.props.state.isValid == false) {
            errorMessage = this.props.state.message;
        }
        let asterisk = (this.props.required)? (<span className="asterisk">*</span>) : null;
        return (
            <div className="row">
                <div className="caption">{this.props.caption}:{asterisk}</div>
                <div className="control"><input type={this.props.type} value={this.props.value} onChange={this.props.onChangeValue}/></div>
                <div className="error">{errorMessage}</div>
            </div>
        );
    }
}