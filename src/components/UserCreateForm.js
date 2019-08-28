import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'


export default class UserCreateForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      userFormView: "hide"
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
          <Button onClick={() => {
            this.setState({
              userFormView: "show"
            })
          }}>Register User</Button>
        :
        <div>
          <Modal show>
            <Modal.Dialog>
              <Modal.Header>
                <Container>
                  <h3>register new user</h3>
                </Container>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group>
                    <input
                      type="text"
                      name="username"
                      placeholder="username"
                      value={this.state.username}
                      onChange={this.handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <input
                      type="email"
                      name="email"
                      placeholder="email"
                      value={this.state.email}
                      onChange={this.handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <input
                      type="password"
                      name="password"
                      placeholder="password"
                      value={this.state.password}
                      onChange={this.handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Button type="submit">Register User</Button>
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Container>
                <Button onClick={() => {
                  this.setState({
                    userFormView: "hide"
                  })
                }}>Hide form</Button>
                </Container>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal>
        </div>

        }

      </div>
    )
  }

//end class
}
