import React, { Component } from 'react';
import PhotoUpdateForm from './PhotoUpdateForm';
import Timestamp from 'react-timestamp';
import Button from 'react-bootstrap/Button'
import Pluralize from 'react-pluralize'
import axios from 'axios'

export default class Photo extends Component {
  constructor(props){
    super(props)

    this.state = {
      likeButtonView: "show"
    }
  }


  handleLikeSubmit = (event) => {
    axios.post('http://localhost:3000/likes', {
      like: {
        user_id: this.props.currentUser.id,
        photo_id: this.props.photo.id
      }
    },
    {withCredentials: true}
    ).then(response => {
      console.log(response.data)
      this.props.handleLikeCreate(response.data)
      this.props.fetchPhotos()
      this.setState({
        likeButtonView: "hide"
      })
    })
    console.log(this.state.likeButtonView);
    console.log(this.props.photo)
    console.log(this.props.currentUser)

    event.preventDefault()

  }

  handleLikeButtonView = (view) => {
    this.setState({
      likeButtonView: view
    })
  }


  render(){
    return(
      <div>

          <h5><Pluralize singular={'like'} count={this.props.photo.likes.length}/></h5>

          {
            this.props.photo.user_id !== this.props.currentUser.id ?
            <div>
              {this.state.likeButtonView === "show" ?
                <div>
                  <Button
                    onClick={this.handleLikeSubmit}
                  >like</Button>
                </div>
                :
                <div>
                  <div>
                    {this.props.photo.likes.map((like, index)=>{
                      return(
                        <div
                          key={index}
                          like={like} >
                            {like.user_id === this.props.currentUser.id ?
                              <Button onClick={() => {
                                  this.props.handleLikeDelete(like.id, index, this.props.likesArray)
                                  this.setState({
                                    likeButtonView: "show"
                                  })
                              }}>Unlike</Button>
                            :
                              <div></div>
                          }

                        </div>
                      )
                    })}
                  </div>
                </div>
              }
            </div>
          :
            <div>

              <h3>No self likes, bro</h3>

            </div>
          }



          <h3>{this.props.photo.title}</h3>
          <img src={this.props.photo.picture} alt={this.props.photo.title} width="200px"/>
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
