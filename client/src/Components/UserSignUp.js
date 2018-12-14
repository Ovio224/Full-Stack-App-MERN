import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Consumer} from './Context';

export default class UserSignUp extends Component {

  render() {
    return (
      <Consumer>
        {({
          firstName,
          lastName,
          emailAddress,
          password,
          confirmPassword,
          actions
        }) => (
          <div className="bounds">
            <div className="grid-33 centered signin">
              <h1>Sign Up</h1>
              <div>
                <form onSubmit={actions.handleSignUp}>
                  <div><input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={firstName}
                    onChange={actions.changeFirstName}
                    placeholder="First Name"/></div>
                  <div><input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={lastName}
                    onChange={actions.changeLastName}
                    placeholder="Last Name"/></div>
                  <div><input
                    id="emailAddress"
                    name="emailAddress"
                    type="text"
                    value={emailAddress}
                    onChange={actions.changeMail}
                    placeholder="Email Address"/></div>
                  <div><input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={actions.changePassword}
                    placeholder="Password"/></div>
                  <div><input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={actions.changeConfirmPassword}
                    placeholder="Confirm Password"/></div>
                  <div className="grid-100 pad-bottom">
                    <button className="button" type="submit">Sign Up</button>
                    <Link className="button button-secondary" to="/">Cancel</Link>
                  </div>
                </form>
              </div>
              <p>&nbsp;</p>
              <p>Already have a user account?
                <a href="sign-in.html">
                  Click here
                </a>
                to sign in!</p>
            </div>
          </div>
        )
}
      </Consumer>
    );
  }
};