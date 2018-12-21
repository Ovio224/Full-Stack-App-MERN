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
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
    signUpError: '',
    signInError: ''
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
        console.log('json', json);
        if (json.success) {
          this.setState({
            signUpError: json.message,
            loading: false,
            emailAddress: '',
            password: '',
          });
        } else {
          this.setState({
            signUpError: json.message,
            isLoading: false,
          });
        }
      })
      .catch(err => console.error(err));
    this.handleSignIn(e);
  }

  handleSignIn = (e) => {
    e.preventDefault();
    const {
      emailAddress,
      password
    } = this.state;

    axios.get('http://localhost:5000/api/users', {
        auth: {
          username: emailAddress,
          password: password
        }
      })
      .then(json => {
        console.log('json', json);
        if (json.success) {
          this.setState({
            signInError: json.message,
            isLoading: false,
            password: '',
            emailAddress: ''
          });
        } else {
          this.setState({
            signInError: json.message,
            isLoading: false,
          });
        }
      })
      .catch(err => console.error(err));
  }
  render() {
    return (
      <Context.Provider value={{
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        emailAddress: this.state.emailAddress,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword,
        actions: {
          changeFirstName: this.changeFirstName,
          changeLastName: this.changeLastName,
          changeMail: this.changeMail,
          changePassword: this.changePassword,
          changeConfirmPassword: this.changeConfirmPassword,
          handleSignUp: this.handleSignUp,
          handleSignIn: this.handleSignIn
        }
      }}>
      { this.props.children }
      </Context.Provider>
    );
  }

}
export const Consumer = Context.Consumer;