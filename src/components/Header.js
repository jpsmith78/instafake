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
              {this.props.currentUser.admin ?
              <h2>Welcome, <span className="capital">{this.props.currentUser.username}: admin</span></h2>
              :this.props.currentUser.id ?
              <h2>Welcome, <span className="capital">{this.props.currentUser.username}</span></h2>
              : "" }
            </Col>
          </Row>
          </Container>
          <Container className="navigation">
          <Row className="justify-content-end">
            <Col>
              <Button onClick={() => {
                this.props.handleView('currentView', 'users')
                this.props.handleFetchUrl('users')
              }}>Users</Button>
            </Col>
            <Col>
              <Button onClick={() => {
                this.props.handleView('currentView', 'photos')
                this.props.handleFetchUrl('photos')
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
                  handleFetchUrl={this.props.handleFetchUrl}
                  handleView={this.props.handleView}
                  handleCreate={this.props.handleCreate}
                  photoFormView={this.props.photoFormView}
                />
              :
                <UserCreateForm
                  handleFetchUrl={this.props.handleFetchUrl}
                  handleView={this.props.handleView}
                  handleCreate={this.props.handleCreate}
                  userFormView={this.props.userFormView}
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
