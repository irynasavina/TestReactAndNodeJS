import React, { Component } from 'react';
import Login from '../components/login';
import RegisterForm from '../components/registerForm';
import Roles from '../utils/roles';
import Ajax from '../utils/ajax';
import Session from '../utils/session';

import '../home/home.css';

class Home extends Component {
    state = {
        isUser: false
    }

    async componentDidMount() {
        this.setState({ isUser: await Roles.hasRole('USR') });
    }

    loginHandler = (roles) => {
        this.setState({ isUser: roles.includes('USR') });
        if (this.props.onLogin) {
            this.props.onLogin(roles)
        }
    }

    logoutHandler = async () => {
        let response = await Ajax.get('logout', 'sessionID=' + encodeURIComponent(Session.getSessionID()));
        let data = JSON.parse(response);
        console.log(data);
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
        if (!this.state.isUser) {
            login = (<Login onLogin={this.loginHandler}/>);
            registerForm = (<RegisterForm/>);
        } else {
            logout = (<input type="button" value="Logout" onClick={this.logoutHandler}/>);
        }
        return (
            <div className="home">
                <h1>Home</h1>
                {login}
                {registerForm}
                {logout}
            </div>
        );
    }
}
export default Home;