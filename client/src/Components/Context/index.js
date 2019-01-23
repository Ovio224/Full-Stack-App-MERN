import React, {
  Component
} from 'react';
import axios from 'axios';
// import {
//   getFromStorage,
//   setInStorage,
// } from '../../app/utilis/storage';

const Context = React.createContext();

export class Provider extends Component {

  state = {
    userId: '',
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
    signedIn: false,
    isLoading: false
  }

  changeFirstName = (e) => {
    this.setState({
      firstName: e.target.value
    })
  }

  changeLastName = (e) => {
    this.setState({
      lastName: e.target.value
    })
  }

  changeMail = (e) => {
    this.setState({
      emailAddress: e.target.value
    })
  }

  changePassword = e => {
    this.setState({
      password: e.target.value
    })
  }

  changeConfirmPassword = e => {
    this.setState({
      confirmPassword: e.target.value
    })
  }

  // creates a new user
  handleSignUp = (e) => {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword
    } = this.state;

    axios.post('http://localhost:5000/api/users', {
        firstName,
        lastName,
        emailAddress,
        password,
        confirmPassword
      })
      .then(json => {
        // console.log('json', json);
        if (json.success) {
          this.setState({
            loading: false,
            emailAddress: '',
            password: '',
          });
        } else {
          this.setState({
            isLoading: false,
          });
        }
      })
      .catch(err => console.error(err));
    setTimeout(function () {
      this.handleSignIn(e);
    }.bind(this), 200);

  }

  // signs the user in
  handleSignIn = (e, history) => {
    e.preventDefault();
    const {
      emailAddress,
      password
    } = this.state;

    axios.get('http://localhost:5000/api/users', {
        auth: {
          username: emailAddress,
          password
        }
      })
      .then(res => {
        let fname;
        let lname;
        let userId;
        res.data.filter(function(data) {
          if (data.emailAddress === emailAddress) {
            fname = data.firstName;
            lname = data.lastName;
            userId = data._id;
          }
          return null;
        });
        if (res.status === 200) {
          this.setState({
            firstName: fname,
            lastName: lname,
            userId,
            isLoading: false,
            password,
            emailAddress,
            signedIn: true
          });
        } else {
          this.setState({
            isLoading: false,
            signedIn: false
          });
        }
      })
      .catch(err => console.error(err));

    setTimeout(function () {
      if (this.state.signedIn) {
        history.goBack();
        // history.push('/');
      }
    }.bind(this), 100);
  }

  // signs out the user
  handleSignOut = () => {
    this.setState({
      firstName: '',
      lastName: '',
      isLoading: false,
      password: '',
      emailAddress: '',
      signedIn: false
    });
  }

  render() {
    return (
      <Context.Provider value={{
        state: this.state,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        emailAddress: this.state.emailAddress,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword,
        signedIn: this.state.signedIn,
        actions: {
          changeFirstName: this.changeFirstName,
          changeLastName: this.changeLastName,
          changeMail: this.changeMail,
          changePassword: this.changePassword,
          changeConfirmPassword: this.changeConfirmPassword,
          handleSignUp: this.handleSignUp,
          handleSignIn: this.handleSignIn,
          handleSignOut: this.handleSignOut
        }
      }}>
      { this.props.children }
      </Context.Provider>
    );
  }

}
export const Consumer = Context.Consumer;