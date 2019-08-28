import React, { Component } from 'react';

export default class UserUpdateForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      id: this.props.user.id,
      username: this.props.user.username,
      email: this.props.user.email,
      userUpdateView: "hide"
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
  // <<<<<<<<HANDLE SUBMIT>>>>>>>>>
  // ===============================
  handleUpdateSubmit = (event) => {
    event.preventDefault()
    this.props.handleUserUpdate(this.state)
    console.log(this.props.user);
  }




  // ===============================
  // <<<<<<<HANDLE VIEW UPDATE>>>>>>>>
  // ===============================
  handleUserUpdateView = (view) => {
    this.setState({
      userUpdateView: view
    })
  }



  // ===============================
  // <<<<<<RENDER>>>>>>>>
  // ===============================
  render(){
    return(
      <div>
        {this.state.userUpdateView === "hide" ?
          <button onClick={() => {
            this.setState({
              userUpdateView: "show"
            })
          }}>Update</button>
        :
          <div>
            <h3>Update user</h3>
            <form onSubmit={this.handleUpdateSubmit}>
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
              <button type="submit">Update User</button>
                <button onClick={() => {
                  this.setState({
                    userUpdateView: "hide"
                  })
                }}>Hide form</button>
            </form>
          </div>
        }
      </div>
    )
  }
}
