import React, { Component } from 'react';
import Timestamp from 'react-timestamp';
import UserUpdateForm from './UserUpdateForm';

export default class User extends Component {
  render(){
    return(
      <div>
        <h3>{this.props.user.username}</h3>
        <h4>{this.props.user.email}</h4>
        <small>Created on <Timestamp date={this.props.user.created_at}/></small><br/>
        <small>Updated <Timestamp relative  date={this.props.user.updated_at}/></small>
        {this.props.user.photos.map((photo, index)=>{
          return(
            <div
              key={index}
              photo={photo}>
                <div>{photo.title}</div>
            </div>
          )
        })}
        <button onClick={() => {
        this.props.handleUserDelete(this.props.user.id, this.props.arrayIndex, this.props.currentArray)}}>Delete</button>
        <UserUpdateForm
          user={this.props.user}
          arrayIndex={this.props.arrayIndex}
          handleUserUpdate={this.props.handleUserUpdate}
        />
      </div>
    )
  }

//end class
}
