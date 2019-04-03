import React, { Component } from 'react';

import '../style.css';

export default class textInput extends Component {
    state = {
        value: this.props.value
    }

    constructor(props) {
        super(props);
    
        this.changeHandler = this.changeHandler.bind(this);
      }

    changeHandler = (event) => {
        let v = event.target.value;
        this.setState({ value: v });
        if (this.props.onChangeValue) {
            this.props.onChangeValue(v);
        }
    }
    
    render() {
        return (
            <div className="row">
                <div className="caption">{this.props.caption}:</div>
                <div className="control"><input type={this.props.type} value={this.state.value || ''} onChange={this.changeHandler}/></div>
            </div>
        );
    }
}