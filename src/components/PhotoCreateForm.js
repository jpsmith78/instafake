import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'


export default class PhotoCreateForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      title: "",
      picture: "",
      description: "",
      photoFormView: "hide"
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
      title,
      picture,
      description
    } = this.state;

    axios.post('http://localhost:3000/photos', {
      photo: {
        title: title,
        picture: picture,
        description: description
      }
    },
      { withCredentials: true }
    )
    .then(response => {
      console.log(response.data)
      this.props.fetchPhotos()
      this.props.handleView('photos')
      this.clearPhotoForm()
      this.props.handlePhotoCreate(response.data)
    })
    .catch(error => {
      console.log(error)

    });
    event.preventDefault();
  }

// ===============================
// <<<<<<<<CLEAR PHOTO FORM>>>>>>>>
// ===============================
  clearPhotoForm = () => {
    this.setState({
      title: "",
      picture: "",
      description: ""
    })
  }

// ===============================
// <<<<<<<<CREATE PHOTO VIEW>>>>>>>>
// ===============================
  handlePhotoCreateView = (view) => {
    this.setState({
      photoFormView: view
    })
  }


// ===============================
// <<<<<<<<CLEAR PHOTO FORM>>>>>>>>
// ===============================
  render(){
    return(
      <div>
        { this.state.photoFormView === "hide" ?
          <Button onClick={() => {
            this.setState({
              photoFormView: "show"
            })
          }}>Post Photo</Button>
        :
        <Modal show>
        <Modal.Dialog>
          <Modal.Header>
            <Container>
              <h3>create photo</h3>
            </Container>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>
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
              <textarea
                name="description"
                placeholder="description"
                value={this.state.description}
                onChange={this.handleChange}
                required
              />
          </Form.Group>
              <Form.Group>
              <Button type="submit" >Create Photo</Button>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Container>
                  <Button onClick={() => {
                    this.setState({
                      photoFormView: "hide"
                    })
                  }}>Hide form</Button>
            </Container>

          </Modal.Footer>
      </Modal.Dialog>
      </Modal>
        }
      </div>
    )
  }

//end class
}
