import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import Login from './Login';
import PhotoCreateForm from './PhotoCreateForm';
import UserCreateForm from './UserCreateForm';


export default class Header extends Component {



  render(){
    return(
      <div className="header">
        <h1>Welcome to Instafake</h1>

        {this.props.currentUser.id ?
        <h2>Welcome, {this.props.currentUser.username}</h2>
        : "" }

        <Nav>
          <Nav.Item>
            <Button onClick={() => {
              this.props.handleView('users')
              this.props.fetchUsers()
            }}>Users</Button>
          </Nav.Item>
          <Nav.Item>
            <Button onClick={() => {
              this.props.handleView('photos')
              this.props.fetchPhotos()
            }}>Photos</Button>
          </Nav.Item>
          {this.props.currentUser.id ?
            <Nav>
              <Nav.Item>
                <Button onClick={ () => {
                  this.props.handleLogoutClick()
                }}>Logout</Button>
              </Nav.Item>
              <Nav.Item>
                <PhotoCreateForm
                  fetchPhotos={this.props.fetchPhotos}
                  fetchUsers={this.props.fetchPhotos}
                  handleView={this.props.handleView}
                  handlePhotoCreate={this.props.handlePhotoCreate}
                />
              </Nav.Item>
            </Nav>
          :
            <Nav>
              <Nav.Item>
                <Login
                  handleLogin={this.props.handleLogin}
                />
              </Nav.Item>
              <Nav.Item>
                <UserCreateForm
                  fetchUsers={this.props.fetchUsers}
                  handleView={this.props.handleView}
                  handleUserCreate={this.props.handlePhotoCreate}
                />
              </Nav.Item>
          </Nav>
          }

        </Nav>

      </div>
    )
  }

//end class
}
