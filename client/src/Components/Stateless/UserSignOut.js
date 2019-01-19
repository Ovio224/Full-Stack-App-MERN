import React from 'react';

class UserSignOut extends React.Component {
  
    componentDidMount() {
        this.props.signOut();
        this.props.history.push('/');
    }
    render() {
        return null;
    }
}

export default UserSignOut;