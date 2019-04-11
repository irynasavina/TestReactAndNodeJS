import React, { Component } from 'react';
import Roles from '../utils/roles';

class Home extends Component {
    state = {
        isUser: false
    }
    
    async componentDidMount() {
        console.log('admin: componentDidMount');
        this.setState({ isUser: await Roles.hasRole('USR') });
    }
    
    render() {
        if (!this.state.isUser) {
            return <h1>Access denied</h1>
        }
        return (
            <h1>Forum home</h1>
        );
    }
}
export default Home;