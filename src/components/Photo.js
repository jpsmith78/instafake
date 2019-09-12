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
      body: "",
      likeButtonView: "show"
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
  // <<<<HANDLE COMMENT SUBMIT>>>>>>
  // ===============================
  handleCommentSubmit = (event) => {
    const { body } = this.state

    axios.post('http://localhost:3000/comments', {
      comment: {
        body: body,
        user_id: this.props.currentUser.id,
        photo_id: this.props.photo.id
      }
    },
      { withCredentials: true }
    ).then(response => {
      console.log(response.data)
    })
    .catch((error) => {
      console.log(error);
    })
    event.preventDefault()

  }


  // ===============================
  // <<<<<<HANDLE LIKE SUBMIT>>>>>>
  // ===============================
  handleLikeSubmit = (event) => {
    axios.post('http://localhost:3000/likes', {
      like: {
        user_id: this.props.currentUser.id,
        photo_id: this.props.photo.id
      }
    },
      { withCredentials: true }
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


  // ===============================
  // <<<<<HANDLE VIEW>>>>>>>>>
  // ===============================
  handleLikeButtonView = (view) => {
    this.setState({
      likeButtonView: view
    })
  }



  // ===============================
  // <<<<<<<<<< RENDER >>>>>>>>>
  // ===============================
  render(){
    return(
      <div>
          <h5><Pluralize singular={'like'} count={this.props.photo.likes.length}/></h5>

          {
            //SHOW LIKE BUTTON

            this.props.photo.user_id !== this.props.currentUser.id ?
            <div>
              {this.state.likeButtonView === "show" ?
                <div>
                  <Button
                    onClick={this.handleLikeSubmit}
                  >like</Button>
                </div>
                :
                //SHOW UNLIKE BUTTON
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
            //END LIKE/UNLIKE BUTTONS
          }

          {
            //COMMENTS FORM
          }
          <form onSubmit={this.handleCommentSubmit}>
            <textarea
              type="text"
              name="body"
              placeholder="comment"
              value={this.state.body}
              onChange={this.handleChange}
              required
            />
            <Button type="submit">add comment</Button>

          </form>
          {
            // PHOTO PROPERTIES
          }
          <h3>{this.props.photo.title}</h3>
          <img src={this.props.photo.picture} alt={this.props.photo.title} width="200px"/>
          <h5>Description: {this.props.photo.description}</h5>
          <small>Created on <Timestamp date={this.props.photo.created_at}/></small><br/>
          <small>Updated <Timestamp relative  date={this.props.photo.updated_at}/></small>
          <h4>Created by: {this.props.photo.user.username}</h4>


          {
            //PHOTO DELETE BUTTON
            this.props.photo.user_id === this.props.currentUser.id || this.props.currentUser.admin ?
            <div>
              <Button onClick={() => {
              this.props.handlePhotoDelete(this.props.photo.id, this.props.arrayIndex, this.props.currentArray)}}>Delete</Button>
              {
                //PHOTO UPDATE BUTTON
              }
              <PhotoUpdateForm
                  photo={this.props.photo}
                  arrayIndex={this.props.arrayIndex}
                  handlePhotoUpdate={this.props.handlePhotoUpdate}
                />
            </div>

            : ""
          }

          {
            //PHOTO COMMENTS
            this.props.photo.comments.map((comment, index)=>{
            return(
              <div
                key={index}
                comment={comment}>
                  <div>{comment.user.username} says:</div>
                  <div>{comment.body}</div>
                    {
                      //COMMENT DELETE BUTTON
                      comment.user_id === this.props.currentUser.id || this.props.currentUser.admin ?
                      <div>
                        <Button onClick={() => {
                        this.props.handleCommentDelete(comment.id, this.props.arrayIndex, this.props.commentArray)}}>Remove Comment</Button>
                      </div>

                      : ""
                    }
              </div>
            )
          })}
        <hr></hr>
      </div>

    )
  }

//end class
}
