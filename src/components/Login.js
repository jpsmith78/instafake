import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {
  constructor(props){
    super(props);

    this.state = {
      email: "",
      password: "",
      loginView: "hide"
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }


  handleSubmit = (event) => {
    const { email, password } = this.state;

    axios.post("http://localhost:3000/sessions",
    {
      user: {
        email: email,
        password: password
      }
    },
      { withCredentials: true}
    )
    .then(response => {
      this.props.handleLogin(response.data)
      console.log(response)
    })
    .catch(error => {
      console.log(error);
    })
    event.preventDefault()
  }

  handleLoginView = (view) => {
    this.setState({
      loginView: view
    })
  }


  render(){
    return(
      <div>
        {this.state.loginView === "hide" ?
          <div>
            <button onClick={() => {
              this.handleLoginView("show")
            }}>Log In</button>
          </div>
          :
          <div className="modal">
            <h1>Log In</h1>
            <form onSubmit={this.handleSubmit}>
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
            <button type="submit">Login</button>
            <button onClick={() => {
              this.handleLoginView("hide")
            } }>close</button>
            </form>
          </div>
        }


      </div>
    )
  }
}
