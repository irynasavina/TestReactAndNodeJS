import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom'
import { Route } from 'react-router';


import AdminHome from './admin/home';
import ForumHome from './forum/home';
import Home from './home/home';
import Roles from './utils/roles';

class App extends Component {
    state = {
        roles: null
    }
    
    async componentWillMount() {
        console.log('app: componentWillMount');
        let roles = await Roles.getRoles();
        console.log(roles);
        this.setState({ roles: roles });
    }

    loginHandler = (roles) => {
        console.log('app loginHandler');
        this.setState({ roles: roles });
    }
    
    render() {
        let menu = null;
        if (this.state.roles) {
            let forum = (this.state.roles.includes('USR'))? ( <li><Link to="/forum">Forum</Link></li> ) : null;
            let admin = (this.state.roles.includes('ADM'))? ( <li><Link to="/admin">Admin</Link></li> ) : null;
            menu = (
                <menu>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        {forum}
                        {admin}
                    </ul>
                </menu>
            )
        }
        return (
            <div className="App">
                {menu}
                <Route path="/" exact render={() => <Home onLogin={this.loginHandler} />}/>
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
