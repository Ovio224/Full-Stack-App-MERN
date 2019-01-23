import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class UpdateCourse extends Component {

  state = {
    title: this.props.data.title,
    materialsNeeded: this.props.data.materialsNeeded,
    estimatedTime: this.props.data.estimatedTime,
    description: this.props.data.description
  }

  componentDidMount() {
    this
      .props
      .getData(`courses/${this.props.match.params.id}`, 'get');
  }

  // updates the course
  handleSubmit = e => {
    e.preventDefault();
    const {title, materialsNeeded, estimatedTime, description} = this.state;

    const password = this.props.state.password;
    const username = this.props.state.emailAddress;

    axios({
      headers: {
        'content-type': 'application/json'
      },
      method: 'put',
      url: `http://localhost:5000/api/courses/${this.props.match.params.id}`,
      auth: {
        username,
        password
      },
      data: {
        title,
        materialsNeeded,
        estimatedTime,
        description
      }
    }).then((response) => console.log(response.status)).catch((error) => console.error(error));

    console.log(this.props.data);
    this
      .props
      .history
      .goBack();

  }

  handleChangeMaterialsNeeded = e => {
    this.setState({materialsNeeded: e.target.value})
  }

  handleChangeTitle = e => {
    this.setState({title: e.target.value})
  }

  handleChangeEstimatedTime = e => {
    this.setState({estimatedTime: e.target.value})
  }

  handleChangeDescription = e => {
    this.setState({description: e.target.value})
  }

  render() {
    const props = this.props.data;
    return (

      <div className="bounds course--detail">
        <h1>Update Course</h1>
        <div>
          <form onSubmit={this.handleSubmit}>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div><input
                  id="title"
                  name="title"
                  type="text"
                  className="input-title course--title--input"
                  placeholder="Course title..."
                  defaultValue={props.title}
                  onChange={this.handleChangeTitle}/></div>
                <p>By {(props.user)
                    ? props.user.firstName + " " + props.user.lastName
                    : " "}</p>
              </div>
              <div className="course--description">
                <div><textarea
                  id="description"
                  name="description"
                  placeholder="Course description..."
                  defaultValue={props.description}
                  onChange={this.handleChangeDescription}
                  /></div>
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
                      className="course--time--input"
                      placeholder="Hours"
                      defaultValue={props.estimatedTime}
                      onChange={this.handleChangeEstimatedTime}
                      /></div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div><textarea
                      id="materialsNeeded"
                      name="materialsNeeded"
                      placeholder="List materials..."
                      defaultValue={props.materialsNeeded}
                      onChange={this.handleChangeMaterialsNeeded}
                      /></div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom">
              <button className="button" type="submit">Update Course</button>
              <Link
                className="button button-secondary"
                to={`/courses/${this.props.match.params.id}`}>Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
};