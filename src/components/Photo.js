import React, { Component } from 'react';
import PhotoUpdateForm from './PhotoUpdateForm';
import Timestamp from 'react-timestamp';
import Button from 'react-bootstrap/Button'


export default class Photo extends Component {

  render(){
    return(
      <div>

          <h3>{this.props.photo.title}</h3>
          <img src={this.props.photo.picture} alt="broken" width="200px"/>
          <h5>Description: {this.props.photo.description}</h5>
          <small>Created on <Timestamp date={this.props.photo.created_at}/></small><br/>
          <small>Updated <Timestamp relative  date={this.props.photo.updated_at}/></small>
          <h4>Created by: {this.props.photo.user.username}</h4>


          { this.props.photo.user_id === this.props.currentUser.id || this.props.currentUser.admin ?
            <div>
              <Button onClick={() => {
              this.props.handlePhotoDelete(this.props.photo.id, this.props.arrayIndex, this.props.currentArray)}}>Delete</Button>
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
