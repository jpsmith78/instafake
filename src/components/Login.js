import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'

export default class Login extends Component {
  constructor(props){
    super(props);

    this.state = {
      email: "",
      password: "",
      loginView: "hide"
    }
  }
  // ==============================
  // <<<<<<HANDLE CHANGE>>>>>>>>
  // ==============================
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  // ==============================
  // <<<<<HANDLE SUBMIT>>>>>>>>
  // ==============================
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
      this.handleLoginView("hide")
      this.clearLoginForm()
      console.log(response.data)
    })
    .catch(error => {
      console.log(error);
    })
    event.preventDefault()
  }


  // ==============================
  // <<<<<<HANDLE LOGIN VIEW>>>>>>>>
  // ==============================
  handleLoginView = (view) => {
    this.setState({
      loginView: view
    })
  }
// ==============================
// <<<<<<CLEAR LOGIN FORM>>>>>>>>
// ==============================
  clearLoginForm = () => {
    this.setState({
      email: "",
      password: ""
    })
  }

// ==============================
// <<<<<<RENDER>>>>>>>>
// ==============================
  render(){
    return(
      <div>
        {this.state.loginView === "hide" ?
          <div>
            <Button onClick={() => {
              this.handleLoginView("show")
            }}>Log In</Button>
          </div>
          :
          <div>
            <Modal show>
              <Modal.Dialog>
                <Modal.Header>
                  <Container>
                    <h1>Log In</h1>
                  </Container>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={this.handleSubmit}>
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
                      <Button type="submit">Login</Button>
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Container>
                    <Button onClick={() => {
                      this.handleLoginView("hide")
                    } }>close</Button>

                  </Container>
                </Modal.Footer>
              </Modal.Dialog>
            </Modal>
          </div>
        }
      </div>
    )
  }
}
