import React, { Component } from 'react';
import Photo from './Photo';
import User from './User';

export default class List extends Component {
  render(){
    return(
      <div>

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
                  handlePhotoDelete={this.props.handlePhotoDelete}
                  handlePhotoUpdate={this.props.handlePhotoUpdate}
                  currentArray='photos'
                  currentUser={this.props.currentUser}
                  message={this.props.message}
                  closeMessage={this.props.closeMessage}

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
