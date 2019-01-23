import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class CourseDetail extends Component {

  componentDidMount() {
    this.props.getData(`courses/${this.props.match.params.id}`, 'get');
  }

  handleClick = () => {

    const password = this.props.state.password;
    const username = this.props.state.emailAddress;

    axios({
      headers: {
        'content-type': 'application/json'
      },
      method: 'delete',
      url: `http://localhost:5000/api/courses/${this.props.match.params.id}`,
      auth: {
        username,
        password
      }
    })
    .then((response) => console.log(response.status))
    .catch((error) => console.error(error));
    this.props.history.push('/');
  }

  render() {
    const props = this.props.data;
    let materialsToShow;
    let materials;
    if(props.materialsNeeded){
      materials = props.materialsNeeded.split("*").filter((material) => material ? material : null);
      materialsToShow = materials.map((material, index) => (
        <li key={index}>{material}</li>
      ));
    }
    
    return (
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
              <span>
                <Link className="button" to={`${this.props.match.params.id}/update`}>Update Course</Link>
                <button className="button" onClick={this.handleClick}>Delete Course</button>
              </span>
              <Link className="button button-secondary" to="/">Return to List</Link>
            </div>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{props.title}</h3>
              <p>By {(props.user) ? props.user.firstName + " " + props.user.lastName : " "}</p>
            </div>
            <div className="course--description">
              <p>{props.description}</p>
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  {(props.estimatedTime) ? <h3>{props.estimatedTime}</h3> : <h2>No estimated time specified</h2>}
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ul>
                    {(materials) ? materialsToShow : <li>No materials specified</li>}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default CourseDetail;