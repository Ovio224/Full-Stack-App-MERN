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

class App extends Component {
  state = {
    data: [],
    loading: true
  }

  getData = (route, method) => {
    axios({
        method,
        url: `http://localhost:5000/api/${route}`
      })
      .then(res => {
        this.setState({
          data: res.data,
          loading: false
        });
      })
      .catch(err => console.error(err));
  }

  render() {

    return (
      <BrowserRouter>
        <div className="App">
          <Header/>
          <Switch>
            <Route
              exact
              path="/"
              render={({location}) => <Courses getData={this.getData} data={this.state.data} key={location.key}/>}/>
            <Route path="/courses/create" component={CreateCourse}/>
            <Route
              exact
              path="/courses/:id/update"
              render={({match}) => <UpdateCourse getData={this.getData} data={this.state.data} match={match}/>}/>
            <Route
              exact
              path="/courses/:id"
              render={({match, location}) => <CourseDetail
              getData={this.getData}
              data={this.state.data}
              match={match}
              key={location.key}/>}/>
              <Route exact path="/signin" component={UserSignIn}/>
              <Route exact path="/signup" render={() =><UserSignUp getData={this.getData}/>}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

// TODO: PROPTYPES
