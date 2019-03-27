import React, { Component } from 'react';
import Login from '../components/login';
import Roles from '../utils/roles';

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

    render() {
        let login = null;
        if (!this.state.isUser) {
            login = (<Login onLogin={this.loginHandler}/>);
        }
        return (
            <div>
                <h1>Home</h1>
                {login}
            </div>
        );
    }
}
export default Home;