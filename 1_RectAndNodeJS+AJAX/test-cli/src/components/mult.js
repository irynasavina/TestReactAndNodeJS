import React, { Component } from 'react';
import Ajax from '../utils/ajax';
import '../components/mult.css';

export default class Mult extends Component {
    state = {
        multiplier: 0,
        result: null
    }

    multiplierChanged = (event) => {
        this.setState({ multiplier: event.target.value })
    }

    mult = async () => {
        try {
            let data = await Ajax.get("mult", "n=" + this.state.multiplier);
            let r = JSON.parse(data);
            this.setState({ result: r })
        } catch (error) {
            console.error(error);
        }
    }
    
    render() {
        let result = null;
        if (this.state.result != null) {
            result =  this.state.result.map(function(item, index) {
                return (
                  <span key={index} className="number">{item}</span>
                )
            });
        }
        return(
            <div>
                <div>
                    <label>Множитель: <input type="number" value={this.state.multiplier} onChange={this.multiplierChanged} /></label>
                </div>
                <div><input type="button" value="Умножить" onClick={this.mult}/></div>
                <div>Результат: {result}</div>
            </div>
        );
    }
}