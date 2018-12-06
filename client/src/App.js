import React, {Component} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import axios from 'axios';

import CreateCourse from './Components/CreateCourse';
import Header from './Components/Stateless/Header';
import Courses from './Components/Courses';


class App extends Component {
  state = {
    data: [],
    loading: true
  }

  getData = (route) => {
    this.setState({loading: true});
    axios
      .get(`http://localhost:5000/api/${route}`)
      .then(res => {
        this.setState({data: res.data, loading: false});
      })
      .catch(err => console.error(err));
  }

  render() {

    return (
      <BrowserRouter>
        <div className="App">
            <Header/>
            <Route
              exact
              path="/courses"
              render={() => <Courses getData={this.getData} data={this.state.data}/>}/>
            <Route exact path="/courses/create" component={CreateCourse}/>
            <Route exact path="/" render={() => <Redirect to="/courses"/>}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
