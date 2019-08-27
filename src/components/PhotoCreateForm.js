import React, { Component } from 'react';
import axios from 'axios';

export default class PhotoCreateForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      title: "",
      picture: "",
      description: ""
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
      if (!response.data.errors) {
        this.setState({
          message: "photo created"
        })
      }else {
        if (response.data.errors.length === 2) {
          this.setState({
            message: "Post was not created: " + response.data.errors[0] + ', and ' + response.data.errors[1]
          })
        } else {
          this.setState({
            message: "photo creation failed: " + response.data.errors[0]
          })
        }

      }

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



  render(){
    return(
      <div>
        {this.state.message ?
        <div>
          <h3>{this.state.message}</h3>
          <button onClick={() => {
              this.setState({
                message: ""
          })
        }}>X</button>
        </div>
        : "" }
        <hr></hr>
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

          <input
            type="text"
            name="description"
            placeholder="description"
            value={this.state.description}
            onChange={this.handleChange}
            required
          />
          <button type="submit">Create Photo</button>
        </form>
        <hr></hr>
      </div>
    )
  }

//end class
}
