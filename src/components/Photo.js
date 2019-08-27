import React, { Component } from 'react';
import PhotoUpdateForm from './PhotoUpdateForm';
import Timestamp from 'react-timestamp';


export default class Photo extends Component {



  render(){
    return(
      <div>

          <h3>{this.props.photo.title}</h3>
          <h4>id: {this.props.photo.id}</h4>
          <h4>Photo: <img src={this.props.photo.picture} alt="broken"/></h4>
          <h5>Description: {this.props.photo.description}</h5>
          <h4>user id: {this.props.photo.user_id}</h4>
          <small>Created on <Timestamp date={this.props.photo.created_at}/></small><br/>
          <small>Updated <Timestamp relative  date={this.props.photo.updated_at}/></small>
          <h4>Created by: {this.props.photo.user.username}</h4>


          { this.props.photo.user_id === this.props.currentUser.id ?
          <div>
            <button onClick={() => {
            this.props.handlePhotoDelete(this.props.photo.id, this.props.arrayIndex, this.props.currentArray)}}>Delete</button>
            <PhotoUpdateForm
                photo={this.props.photo}
                arrayIndex={this.props.arrayIndex}
                handlePhotoUpdate={this.props.handlePhotoUpdate}


              />
          </div>

            : ""
       }
        <hr></hr>
      </div>

    )
  }

//end class
}
