import React, { Component } from 'react';
import axios from 'axios';
import Login from './Login';
import PhotoCreateForm from './PhotoCreateForm';
import UserCreateForm from './UserCreateForm';


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
      <div className="header">
        <h1>Welcome to Instafake</h1>

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

          {this.props.currentUser.id ?
            <div>
              <button onClick={ () => {
                this.handleLogoutClick()
              }}>Logout</button>
              <PhotoCreateForm
                fetchPhotos={this.props.fetchPhotos}
                handleView={this.props.handleView}
                handlePhotoCreate={this.props.handlePhotoCreate}
              />
            </div>
          :
            <div>
              <Login
                handleLogin={this.props.handleLogin}
              />
              <UserCreateForm
                fetchUsers={this.props.fetchPhotos}
                handleView={this.props.handleView}
                handleUserCreate={this.props.handlePhotoCreate}
              />
            </div>
          }

        </nav>

      </div>
    )
  }

//end class
}
