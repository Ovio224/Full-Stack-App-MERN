import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class UpdateCourse extends Component{

  componentDidMount() {
    this.props.getData(`courses/${this.props.match.params.id}`);
  }

  render() {
    const props = this.props.data;
      return (
  
        <div className="bounds course--detail">
          <h1>Update Course</h1>
          <div>
            <form>
              <div className="grid-66">
                <div className="course--header">
                  <h4 className="course--label">Course</h4>
                  <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." defaultValue={props.title} /></div>
                  <p>By {(props.user) ? props.user.firstName + " " + props.user.lastName : " "}</p>
                </div>
                <div className="course--description">
                  <div><textarea id="description" name="description" placeholder="Course description..." defaultValue={props.description} /></div>
                </div>
              </div>
              <div className="grid-25 grid-right">
                <div className="course--stats">
                  <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" defaultValue={props.estimatedTime} /></div>
                    </li>
                    <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>
                      <div><textarea id="materialsNeeded" name="materialsNeeded" placeholder="List materials..." defaultValue={props.materialsNeeded} /></div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="grid-100 pad-bottom"><button className="button" type="submit">Update Course</button>
              <Link className="button button-secondary" to={`/courses/${this.props.match.params.id}`}>Cancel</Link></div>
            </form>
          </div>
        </div>
      );
    }
};