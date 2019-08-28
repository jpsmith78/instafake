import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'

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
    this.handleUserUpdateView("hide")
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
          <Button onClick={() => {
            this.setState({
              userUpdateView: "show"
            })
          }}>Update</Button>
        :
          <div>
            <Modal show>
              <Modal.Dialog>
                <Modal.Header>
                  <Container>
                    <h3>Update User</h3>
                  </Container>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={this.handleUpdateSubmit}>
                    <Form.Group>
                      <label>Username</label>
                    </Form.Group>
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
                      <label>Email</label>
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
                      <Button type="submit">Update User</Button>
                    </Form.Group>


                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Container>
                    <Button onClick={() => {
                      this.setState({
                        userUpdateView: "hide"
                      })
                    }}>CLose</Button>
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
