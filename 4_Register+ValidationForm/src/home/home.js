import React, { Component } from 'react';
import Cookies from 'universal-cookie';

import Login from '../components/login';
import RegisterForm from '../components/registerForm';
import Roles from '../utils/roles';
import Ajax from '../utils/ajax';
import Session from '../utils/session';


import '../home/home.css';

class Home extends Component {
    state = {
        isUser: false,
        welcomeMessage: null
    }

    async componentDidMount() {
        this.setState({ isUser: await Roles.hasRole('USR') });
    }

    loginHandler = (roles, sessionID, message) => {
        if (roles !== undefined) {
            const cookies = new Cookies();
            cookies.set('sessionID', sessionID, { path: '/' });
            this.setState({ isUser: roles.includes('USR'), welcomeMessage: message });
        }
        if (this.props.onLogin) {
            this.props.onLogin(roles)
        }
    }

    logoutHandler = async () => {
        let response = await Ajax.get('logout', 'sessionID=' + encodeURIComponent(Session.getSessionID()));
        JSON.parse(response);
        Session.removeSession();
        this.setState({ isUser: false });
        if (this.props.onLogin) {
            this.props.onLogin([])
        }
    }

    render() {
        let login = null;
        let registerForm = null;
        let logout = null;
        let welcome = null;
        if (!this.state.isUser) {
            login = (<Login onLogin={this.loginHandler}/>);
            registerForm = (<RegisterForm onLogin={this.loginHandler}/>);
        } else {
            welcome = (<h2>{this.state.welcomeMessage}</h2>);
            logout = (<input type="button" value="Logout" onClick={this.logoutHandler}/>);
        }
        return (
            <div className="home">
                <h1>Home</h1>
                {welcome}
                {login}
                {registerForm}
                {logout}
            </div>
        );
    }
}
export default Home;