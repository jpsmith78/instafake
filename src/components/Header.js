import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Login from './Login'
import PhotoCreateForm from './PhotoCreateForm'
import UserCreateForm from './UserCreateForm'

export default class Header extends Component {



  render(){
    return(
      <Container fluid className="header">
        <Container>
          <Row>
            <Col>
              <h1>Welcome to Instafake</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              {this.props.currentUser.id ?
              <h2>Welcome, {this.props.currentUser.username}</h2>
              : "" }
            </Col>
          </Row>
          </Container>
          <Container className="navigation">
          <Row className="justify-content-end">
            <Col>
              <Button onClick={() => {
                this.props.handleView('users')
                this.props.fetchUsers()
              }}>Users</Button>
            </Col>
            <Col>
              <Button onClick={() => {
                this.props.handleView('photos')
                this.props.fetchPhotos()
              }}>Photos</Button>
            </Col>
            <Col></Col>
            <Col></Col>
            <Col></Col>
            <Col>
              {
                this.props.currentUser.id ?
                <Button onClick={ () => {
                  this.props.handleLogoutClick()
                }}>Logout</Button>
              :
                <Login
                  handleLogin={this.props.handleLogin}
                />
              }
            </Col>
            <Col>
              {this.props.currentUser.id ?

                <PhotoCreateForm
                  fetchPhotos={this.props.fetchPhotos}
                  fetchUsers={this.props.fetchUsers}
                  handleView={this.props.handleView}
                  handlePhotoCreate={this.props.handlePhotoCreate}
                />
              :
                <UserCreateForm
                  fetchUsers={this.props.fetchUsers}
                  handleView={this.props.handleView}
                  handleUserCreate={this.props.handleUserCreate}
                />
              }
            </Col>
          </Row>
        </Container>
      </Container>
    )
  }

//end class
}
