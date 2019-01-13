import React from 'react';
import {Link} from 'react-router-dom';
import {Consumer} from '../Context';

const Header = () => {
  return (
    <Consumer >
      {({firstName, lastName, signedIn, actions}) => (
        <div className="header">
          <div className="bounds">
            <h1 className="header--logo">Courses</h1>
              {signedIn
                ? <nav><span>Welcome, <b>{firstName + " " + lastName}</b></span><Link className="signout" to="/" onClick={actions.handleSignOut}>Sign Out</Link></nav>
                : <nav><Link className="signup" to="/signup">Sign Up</Link>
                  <Link className="signin" to="/signin">Sign In</Link></nav>}
          </div>
        </div>
      )}
    </Consumer>
  );
}

export default Header;