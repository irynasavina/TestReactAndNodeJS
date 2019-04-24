import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom'
import { Route } from 'react-router';


import AdminHome from './admin/home';
import ForumHome from './forum/home';
import Home from './home/home';
import ForgotPassword from './home/forgotPassword';
import RestorePassword from './home/restorePassword';

import Roles from './utils/roles';

class App extends Component {
    state = {
        roles: null
    }
    
    async componentWillMount() {
        let roles = await Roles.getRoles();
        this.setState({ roles: roles });
    }

    loginHandler = (roles) => {
        this.setState({ roles: roles });
    }
    
    render() {
        let forum = null;
        let admin = null;
        if (this.state.roles) {
            forum = (this.state.roles.includes('USR'))? ( <li><Link to="/forum">Forum</Link></li> ) : null;
            admin = (this.state.roles.includes('ADM'))? ( <li><Link to="/admin">Admin</Link></li> ) : null;
        }
        let menu = (
            <menu>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    {forum}
                    {admin}
                </ul>
            </menu>
        )
        return (
            <div className="App">
                {menu}
                <Route path="/" exact render={() => <Home onLogin={this.loginHandler} />}/>
                <Route path="/forgotPassword" component={ForgotPassword}/>
                <Route path="/restorePassword/:token" component={RestorePassword}/>
                <Route path="/forum" component={ForumHome}/>
                <Route path="/admin" component={AdminHome}/>
                <div>
                    {this.props.children}
                </div>
                
            </div>
        );
    }
}

export default App;
