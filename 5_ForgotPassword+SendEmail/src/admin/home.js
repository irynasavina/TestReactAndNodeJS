import React, { Component } from 'react';
import Roles from '../utils/roles';

class Home extends Component {
    state = {
        isAdministrator: false
    }
    
    async componentDidMount() {
        console.log('admin: componentDidMount');
        this.setState({ isAdministrator: await Roles.hasRole('ADM') });
    }
    
    render() {
        if (!this.state.isAdministrator) {
            return <h1>Access denied</h1>
        }
        return (
            <h1>Admin home</h1>
        );
    }
}
export default Home;