import React, { Component } from 'react';
import Photo from './Photo';
import User from './User';
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

export default class List extends Component {
  render(){
    return(
      <div>
        { this.props.message.length >= 1 ?
        <div>
          <Alert variant="info">
          {this.props.message.map((message, index)=>{
            return(
              <div
                key={index}
                message={message}>
                  <p>{message}</p>
              </div>
            )
          })}
          <Button onClick={this.props.closeMessage}>OK</Button>
          </Alert>
        </div>
        : ""}

        {this.props.currentView === 'photos' ?
        <div>
          <h2>Photos</h2>
          <div>
            {this.props.photos.map((photo, index)=>{
              return (
                <Photo

                  key={index}
                  photo={photo}
                  arrayIndex={index}
                  currentArray='photos'
                  likesArray='likes'
                  commentsArray='comments'
                  currentUser={this.props.currentUser}
                  fetchPhotos={this.props.fetchPhotos}
                  handleCreateLike={this.props.handleCreateLike}
                  handlePhotoDelete={this.props.handlePhotoDelete}
                  handlePhotoUpdate={this.props.handlePhotoUpdate}
                  handleLikeCreate={this.props.handleLikeCreate}
                  handleLikeDelete={this.props.handleLikeDelete}
                  handleCommentCreate={this.props.handleCommentCreate}
                  handleCommentUpdate={this.props.handleCommentUpdate}
                  handleCommentDelete={this.props.handleCommentDelete}
                />
              )
            })}
          </div>
        </div>
          :
        <div>
          <h2>Users</h2>
            <div>
              {this.props.users.map((user, index)=>{
                return (
                  <User
                    key={index}
                    user={user}
                    arrayIndex={index}
                    handleUserDelete={this.props.handleUserDelete}
                    handleUserUpdate={this.props.handleUserUpdate}
                    currentArray='users'
                    currentUser={this.props.currentUser}
                  />
                )
              })}
            </div>
        </div>
        }
      </div>
    )
  }

//end class
}
