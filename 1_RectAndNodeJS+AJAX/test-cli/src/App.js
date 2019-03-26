import React, { Component } from 'react';
import './App.css';
import Mult from './components/mult';
import Login from './components/login';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Mult/>
                <hr/>
                <Login/>
            </div>
        );
    }
}

export default App;
