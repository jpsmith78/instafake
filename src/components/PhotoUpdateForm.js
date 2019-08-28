import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'

export default class PhotoUpdateForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      id: this.props.photo.id,
      title: this.props.photo.title,
      picture: this.props.photo.picture,
      description: this.props.photo.description,
      photoUpdateView: "hide"
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
  handleUpdateSubmit = (event) => {
    event.preventDefault();
    this.props.handlePhotoUpdate(this.state)
    this.handlePhotoUpdateView("hide")
    console.log(this.props.photo);
  }



// ===============================
// <<<<<<<HANDLE VIEW UPDATE>>>>>>>>
// ===============================
  handlePhotoUpdateView = (view) => {
    this.setState({
      photoUpdateView: view
    })
  }

  // ===============================
  // <<<<<<RENDER>>>>>>>>
  // ===============================
  render(){
    return(
      <div>
        { this.state.photoUpdateView === "hide" ?
          <Button onClick={() => {
            this.setState({
              photoUpdateView: "show"
            })
          }}>Update</Button>
          :
          <div>
            <Modal show>
              <Modal.Dialog>
                <Modal.Header>
                  <Container>
                    <h3>Update Photo</h3>
                  </Container>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={this.handleUpdateSubmit}>
                    <Form.Group>
                      <label>Photo Title</label>
                    </Form.Group>
                    <Form.Group>
                      <input
                        type="text"
                        name="title"
                        placeholder="title"
                        value={this.state.title}
                        onChange={this.handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <label>Photo Url</label>
                    </Form.Group>
                    <Form.Group>
                      <input
                        type="text"
                        name="picture"
                        placeholder="picture"
                        value={this.state.picture}
                        onChange={this.handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <label>Photo Description</label>
                    </Form.Group>
                    <Form.Group>
                      <textarea
                        name="description"
                        placeholder="description"
                        value={this.state.description}
                        onChange={this.handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Button type="submit">Update Photo</Button>
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Container>
                    <Button onClick={() => {
                      this.setState({
                        photoUpdateView: "hide"
                      })
                    }}>Close</Button>
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
