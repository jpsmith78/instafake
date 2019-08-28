import React, { Component } from 'react';
import axios from 'axios';

export default class UserCreateForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      userFromView: "hide"
    }
  }



// ===============================
// <<<<<<<<HANDLE CHANGE>>>>>>>>>
// ===============================
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }


// ===============================
// <<<<<<<<HANDLE SUBMIT>>>>>>>>
// ===============================
  handleSubmit = (event) => {
    const {
      username,
      email,
      password
    } = this.state;

    axios.post('http://localhost:3000/users', {
      user: {
        username: username,
        email: email,
        password: password
      }
    },
      { withCredentials: true}
    )
    .then(response => {
      console.log(response.data)
      this.props.fetchUsers()
      this.props.handleView('users')
      this.clearUserForm()
      this.props.handleUserCreate(response.data)
    })
    .catch(error => {
      console.log(error)
    });
    event.preventDefault();
  }

// ===============================
// <<<<<<<<CLEAR PHOTO FORM>>>>>>>>
// ===============================
  clearUserForm = () => {
    this.setState({
      username: "",
      email: "",
      password: ""
    })
  }

// ===============================
// <<<<<<<<CREATE PHOTO VIEW>>>>>>>>
// ===============================
  handleUserCreateView = (view) => {
    this.setState({
      userFormView: view
    })
  }

  render(){
    return(
      <div>
        {this.state.userFormView === "hide" ?
          <button onClick={() => {
            this.setState({
              userFormView: "show"
            })
          }}>Register User</button>
        :
        <div>
          <h3>register new user</h3>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="username"
              value={this.state.username}
              onChange={this.handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
          <button type="submit">Register User</button>
              <button onClick={() => {
                this.setState({
                  userFormView: "hide"
                })
              }}>Hide form</button>
          </form>
        </div>
        }

      </div>
    )
  }

//end class
}
