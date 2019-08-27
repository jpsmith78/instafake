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
          message: ["photo created"]
        })
        console.log(this.state.message);
      }else {
        this.setState({
          message:  response.data.errors
        })
        console.log(this.state.message);
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
          {this.state.message.map((message, index)=>{
            return(
              <ul
                key={index}
                message={message}>
                  <li>{message}</li>
              </ul>
            )
          })}
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
