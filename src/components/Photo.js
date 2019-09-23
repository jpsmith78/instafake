import React, { Component } from 'react'
import PhotoUpdateForm from './PhotoUpdateForm'
import CommentUpdateForm from './CommentUpdateForm'
import CommentLikeCreateForm from './CommentLikeCreateForm'
import Timestamp from 'react-timestamp'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Pluralize from 'react-pluralize'
import axios from 'axios'


export default class Photo extends Component {
  constructor(props){
    super(props)

    this.state = {
      body: '',
      likeUserView: 'hide',
      likeButtonView: 'show',
      commentFormView: 'hide'

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
      this.props.handleCreate(response.data)
      this.props.handleFetchUrl('photos')
      this.handleArrayView('commentFormView', 'hide')
      this.clearCommentForm()
    })
    .catch((error) => {
      console.log(error);
    })
    event.preventDefault()

  }


  // ===============================
  // <<<<CLEAR COMMENT FORM>>>>>>
  // ===============================
  clearCommentForm = () => {
    this.setState({
      body: ""
    })
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
      this.props.handleCreate(response.data)
      this.props.handleFetchUrl('photos')
      this.handleArrayView('likeButtonView', 'hide')
    })
    .catch((error) => {
      console.log(error);
    })
    event.preventDefault()
  }




  // ===============================
  // <<<<<HANDLE ARRAY VIEW>>>>>>>>>
  // ===============================
  handleArrayView = (target, view) => {
    this.setState({
      [target]: view
    })
  }
  // ===============================
  // <<<<<<<<<< RENDER >>>>>>>>>
  // ===============================
  render(){
    return(
      <div>
          <h5 onClick={() => {
            this.handleArrayView('likeUserView','show')
          }}><Pluralize singular={'like'} count={this.props.photo.likes.length}/></h5>
        { this.state.likeUserView === "show" ?
          <div>
            <Modal show>
              <Modal.Dialog>
                <Modal.Header>
                  <Container>
                    <h3>Users Who Like {this.props.photo.title}</h3>
                  </Container>
                </Modal.Header>
                <Modal.Body>
                  <Container>
                    { this.props.photo.likes.map((like, index) => {
                      return(
                          <div
                            key={index}
                            like={like}>
                            {like.user.username}
                          </div>
                        )
                      })
                    }
                  </Container>
                </Modal.Body>
                <Modal.Footer>
                  <Container>
                    <Button onClick={() => {
                        this.handleArrayView('likeUserView','hide')
                    }}>Close</Button>
                  </Container>
                </Modal.Footer>


              </Modal.Dialog>
            </Modal>

          </div>
          :
          <div></div>
          }

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
                                  this.props.handleDelete('likes/' + like.id, index, 'likes')
                                  this.handleArrayView('likeButtonView', 'show')
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
              <h5>No self likes, bro</h5>
            </div>
            //END LIKE/UNLIKE BUTTONS
          }


          {
            //COMMENT FORM
            this.state.commentFormView === "hide" ?
            <Button onClick={() => {
              this.handleArrayView('commentFormView', 'show')
            }}>Add Comment</Button>

          :

            <div>
              <Modal show>
                <Modal.Dialog>
                  <Modal.Header>
                    <Container>
                      <h3>Add Comment</h3>
                    </Container>
                  </Modal.Header>
                  <Modal.Body>
                    <Form onSubmit={this.handleCommentSubmit}>
                      <Form.Group>
                        <label>Comment</label>
                      </Form.Group>
                      <Form.Group>
                        <textarea
                          type="text"
                          name="body"
                          placeholder="comment"
                          value={this.state.body}
                          onChange={this.handleChange}
                          required
                        />
                      </Form.Group>
                      <Form.Group>
                        <Button type="submit">Submit</Button>
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Container>
                      <Button onClick={() => {
                        this.handleArrayView('commentFormView', 'hide')
                      }}>Close</Button>
                    </Container>
                  </Modal.Footer>
                </Modal.Dialog>
              </Modal>


            </div>
          }

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
              this.props.handleDelete('photos/' + this.props.photo.id, this.props.arrayIndex, 'photos')}}>Delete</Button>
              {
                //PHOTO UPDATE BUTTON
              }
              <PhotoUpdateForm
                  photo={this.props.photo}
                  arrayIndex={this.props.arrayIndex}
                  handleUpdate={this.props.handleUpdate}
                  handleFetchUrl={this.props.handleFetchUrl}
                  handleView={this.props.handleView}
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
                        this.props.handleDelete('comments/' + comment.id, this.props.arrayIndex, 'comments')}}>Remove Comment</Button>

                        <CommentUpdateForm
                          comment={comment}
                          arrayIndex={this.props.arrayIndex}
                          commentsArray={this.props.commentsArray}
                          handleUpdate={this.props.handleUpdate}
                        />
                        
                      </div>

                      :
                      <div></div>
                        }
                      <CommentLikeCreateForm
                        handleFetchUrl={this.props.handleFetchUrl}
                        handleDelete={this.props.handleDelete}
                        handleArrayView={this.handleArrayView}
                        handleCreate={this.props.handleCreate}
                        currentUser={this.props.currentUser}
                        comment={comment}
                        arrayIndex={this.props.arrayIndex}
                        commentsArray={this.props.commentsArray}
                      />

              </div>
            )
          })}
        <hr></hr>
      </div>

    )
  }

//end class
}
