import React, { Component } from 'react';
import axios from 'axios';
import Login from './Login';



export default class Header extends Component {

  handleLogoutClick(){
    axios.delete("http://localhost:3000/logout", {withCredentials: true}).then(response => {
      this.props.handleLogout();
    }).catch(error => {
      console.log("logout error", error);
    })
  }

  render(){
    return(
      <div>
        <h1>Welcome to Instafake</h1>
        <h2>{this.props.loggedInStatus}</h2>
        {this.props.currentUser.id ?
        <h2>Welcome, {this.props.currentUser.username}</h2>
        : "" }
        <nav>
          <button onClick={() => {
            this.props.handleView('users')
          }}>Users</button>
          <button onClick={() => {
            this.props.handleView('photos')
          }}>Photos</button>
        </nav>
        { this.props.message.length > 0 ?
          <div>
            <h3>{this.props.message}</h3>
            <button onClick={this.props.closeMessage}>X</button>
          </div>
        : ""}
        {  this.props.currentUser.id ?
          <button onClick={ () => {
            this.handleLogoutClick()
          }}>Logout</button>
      :
      <Login
        handleLogin={this.props.handleLogin}
        message={this.props.message}
        closeMessage={this.props.closeMessage}
      />
  }
      </div>
    )
  }

//end class
}
