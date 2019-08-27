import React, { Component } from 'react';

export default class PhotoUpdateForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      id: this.props.photo.id,
      title: this.props.photo.title,
      picture: this.props.photo.picture,
      description: this.props.photo.description
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
    console.log(this.props.photo);
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
        { this.props.message ?
        <div>
          <h3>{this.props.message}</h3>
          <button onClick={this.props.closeMessage}>X</button>
        </div>
        : ""}
        <h3>update photo</h3>
        <form onSubmit={this.handleUpdateSubmit}>
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
          <button type="submit">Update Photo</button>
        </form>
      </div>
    )
  }
//end class
}
