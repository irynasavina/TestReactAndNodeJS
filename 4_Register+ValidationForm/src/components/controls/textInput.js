import React, { Component } from 'react';

import '../style.css';

export default class textInput extends Component {
    
    render() {
        return (
            <div className="row">
                <div className="caption">{this.props.caption}:</div>
                <div className="control"><input type={this.props.type} value={this.props.value} onChange={this.props.onChangeValue}/></div>
            </div>
        );
    }
}