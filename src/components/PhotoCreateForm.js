import React, { Component } from 'react';
import axios from 'axios';

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
          <button onClick={() => {
            this.setState({
              photoFormView: "show"
            })
          }}>Post Photo</button>
        :
        <div>
        <h3>create photo</h3>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="title"
            value={this.state.title}
            onChange={this.handleChange}
            required
          />

          <input
            type="text"
            name="picture"
            placeholder="picture"
            value={this.state.picture}
            onChange={this.handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="description"
            value={this.state.description}
            onChange={this.handleChange}
            required
          />
          <button type="submit" >Create Photo</button>
          <button onClick={() => {
            this.setState({
              photoFormView: "hide"
            })
          }}>Hide form</button>
        </form>
        </div>
        }
      </div>
    )
  }

//end class
}
