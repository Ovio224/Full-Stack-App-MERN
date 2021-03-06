import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import axios from 'axios';

import Header from './Components/Stateless/Header';
import Courses from './Components/Courses';
import CreateCourse from './Components/CreateCourse';
import CourseDetail from './Components/CourseDetail';
import UpdateCourse from './Components/UpdateCourse';
import UserSignIn from './Components/UserSignIn';
import UserSignUp from './Components/UserSignUp';
import UserSignOut from './Components/Stateless/UserSignOut';
import {Consumer} from './Components/Context/';

class App extends Component {
  state = {
    data: [],
    loading: true
  }

  // calls the restapi - custom function for reusability
  getData = (route, method) => {
    axios({method, url: `http://localhost:5000/api/${route}`}).then(res => {
      this.setState({data: res.data, loading: false});
    }).catch(err => console.error(err));
  }

  render() {

    return (
      <Consumer>
        {({actions, state}) => (
          <BrowserRouter>
            <div className="App">
              <Route path="/" component={Header}/>
              <Switch>
                <Route
                  exact
                  path="/"
                  render={({location}) => <Courses getData={this.getData} data={this.state.data} key={location.key}/>}/>
                <Route
                  path="/courses/create"
                  render={({history}) => <CreateCourse state={state} history={history} data={this.state.data}/>}/>
                <Route
                  exact
                  path="/courses/:id/update"
                  render={({match, history}) => <UpdateCourse state={state} history={history} getData={this.getData} data={this.state.data} match={match}/>}/>
                <Route
                  exact
                  path="/courses/:id"
                  render={({match, location, history}) => <CourseDetail
                  history={history}
                  state={state}
                  getData={this.getData}
                  data={this.state.data}
                  match={match}
                  key={location.key}/>}/>
                <Route
                  exact
                  path="/signin"
                  render={({history}) => <UserSignIn history={history}/>}/>
                <Route
                  exact
                  path="/signup"
                  render={() =>< UserSignUp getData = {
                  this.getData
                } />}/>
                <Route exact path="/signout"
                render={({history}) => <UserSignOut history={history} signOut={actions.handleSignOut}/>}/>
              </Switch>
            </div>
          </BrowserRouter>
        )}
      </Consumer>
    );
  }
}

export default App;

// TODO: PROPTYPES