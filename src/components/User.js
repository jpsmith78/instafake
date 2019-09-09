import React, { Component } from 'react';
import Timestamp from 'react-timestamp';
import UserUpdateForm from './UserUpdateForm';
import Button from 'react-bootstrap/Button'
import Pluralize from 'react-pluralize'

export default class User extends Component {
  render(){
    return(
      <div>

        <h3>{this.props.user.username}</h3>
        <img src={this.props.user.image} alt="broken" width="200px"/>
        <h4>{this.props.user.email}</h4>
        <small>Created on <Timestamp date={this.props.user.created_at}/></small><br/>
        <small>Updated <Timestamp relative  date={this.props.user.updated_at}/></small>
        <h4><Pluralize singular={'photo'} count={this.props.user.photos.length}/></h4>
        {this.props.user.photos.map((photo, index)=>{
          return(
            <div
              key={index}
              photo={photo}>
                <div>{photo.title}</div>
            </div>
          )
        })}
        {this.props.user.id === this.props.currentUser.id ?
          <div>
            <UserUpdateForm
              user={this.props.user}
              arrayIndex={this.props.arrayIndex}
              handleUserUpdate={this.props.handleUserUpdate}
            />
          </div>
        : this.props.currentUser.admin ?
          <div>
            <Button onClick={() => {
              this.props.handleUserDelete(this.props.user.id, this.props.arrayIndex, this.props.currentArray)}}>Delete</Button>
            <UserUpdateForm
              user={this.props.user}
              arrayIndex={this.props.arrayIndex}
              handleUserUpdate={this.props.handleUserUpdate}
            />

          </div>
        : "" }
      </div>
    )
  }

//end class
}
