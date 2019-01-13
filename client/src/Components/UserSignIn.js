import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Consumer } from './Context';

export default class UserSignIn extends Component {
  render() {
    return (
      <Consumer>
        {({emailAddress, password, actions}) => (
          <div className="bounds">
          <div className="grid-33 centered signin">
            <h1>Sign In</h1>
            <div>
              <form onSubmit={(event) => actions.handleSignIn(event, this.props.history)}>
                <div><input
                  id="emailAddress"
                  name="emailAddress"
                  value={emailAddress}
                  onChange={actions.changeMail}
                  type="text"
                  placeholder="Email Address"/></div>
                <div><input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={actions.changePassword}
                  placeholder="Password"/></div>
                <div className="grid-100 pad-bottom">
                  <button className="button" type="submit">Sign In</button>
                  <Link
                    className="button button-secondary"
                    to="/">Cancel</Link>
                </div>
              </form>
            </div>
            <p>&nbsp;</p>
            <p>Don't have a user account?
              <Link to="/"> Click here </Link>
              to sign up!</p>
          </div>
        </div>
        )}
      </Consumer>
    );
  }
};