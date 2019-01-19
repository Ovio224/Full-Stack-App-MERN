import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default class CreateCourse extends Component {

  state = {
    title: "",
    materialsNeeded: "",
    estimatedTime: "",
    description: ""
  }

  handleSubmit = e => {
    e.preventDefault();
    let {
      title,
      materialsNeeded,
      estimatedTime,
      description
    } = this.state;

    // this.props.getData('courses', 'post');
    axios.post('http://localhost:5000/api/courses', {
      auth: {
        username: this.props.state.emailAddress,
        password: this.props.state.password
      },
      title,
      materialsNeeded,
      estimatedTime,
      description
    }).then(res => console.log(res.json()))
      .catch(err => console.error(err));
  }

  handleChangeMaterialsNeeded = e => {
    this.setState({
      materialsNeeded: e.target.value
    })
  }

  handleChangeTitle = e => {
    this.setState({
      title: e.target.value
    })
  }

  handleChangeEstimatedTime = e => {
    this.setState({
      estimatedTime: e.target.value
    })
  }

  handleChangeDescription = e => {
    this.setState({
      description: e.target.value
    })
  }

  render() {
    return (

      <div className="bounds course--detail">
        <h1>Create Course</h1>
        <div>
          {/* <div>
            <h2 className="validation--errors--label">Validation errors</h2>
            <div className="validation-errors">
              <ul>
                <li>Please provide a value for "Title"</li>
                <li>Please provide a value for "Description"</li>
              </ul>
            </div>
          </div> */}
          <form onSubmit={this.handleSubmit}>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div><input
                  id="title"
                  name="title"
                  type="text"
                  onChange={this.handleChangeTitle}
                  className="input-title course--title--input"
                  placeholder="Course title..."/>
                </div>
                {/* <p>By Joe Smith</p> */}
              </div>
              <div className="course--description">
                <div><textarea
                  id="description"
                  name="description"
                  placeholder="Course description..."
                  onChange={this.handleChangeDescription}
                  defaultValue={""}/></div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div><input
                      id="estimatedTime"
                      name="estimatedTime"
                      type="text"
                      onChange={this.handleChangeEstimatedTime}
                      className="course--time--input"
                      placeholder="Hours"/></div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div><textarea
                      id="materialsNeeded"
                      name="materialsNeeded"
                      placeholder="List materials..."
                      onChange={this.handleChangeMaterialsNeeded}
                      defaultValue={""}/></div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom">
              <button className="button" type="submit">Create Course</button>
              {/* , location.href='/' */}
              <Link className="button button-secondary" to="/">Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
};