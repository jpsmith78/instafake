import React, { Component } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Pluralize from 'react-pluralize'
import Modal from 'react-bootstrap/Modal'
import Container from 'react-bootstrap/Container'

export default class CommentLikeCreateForm extends Component {
  constructor(props){
    super(props)

    this.state = {
      commentLikeButtonView: 'show',
      commentLikeUserView: 'hide'
    }
  }
  // ===============================
  // <<<<<<HANDLE COMMENT LIKE SUBMIT>>>>>>
  // ===============================
  handleCommentLikeSubmit = (event) => {
    axios.post('http://localhost:3000/comment_likes', {
      comment_like: {
        user_id: this.props.currentUser.id,
        comment_id: this.props.comment.id
      }
    },
      { withCredentials: true }
    ).then(response => {
      console.log(response.data)
      this.props.handleCreate(response.data)
      this.props.handleFetchUrl('photos')
      this.handleLikeArrayView('commentLikeButtonView', 'hide')
    })
    .catch((error) => {
      console.log(error);
    })
    event.preventDefault()
  }

  handleLikeArrayView = (target, view) => {
    this.setState({
      [target]: view
    })
  }

  render(){
    return(

      <div>




        <h5 onClick={() => {
          this.handleLikeArrayView('commentLikeUserView','show')
        }}><Pluralize singular={'like'} count={this.props.comment.comment_likes.length}/></h5>
      { this.state.commentLikeUserView === "show" ?
        <div>
          <Modal show>
            <Modal.Dialog>
              <Modal.Header>
                <Container>
                  <h3>Users Who Like this comment</h3>
                </Container>
              </Modal.Header>
              <Modal.Body>
                <Container>
                  { this.props.comment.comment_likes.map((like, index) => {
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
                      this.handleLikeArrayView('commentLikeUserView','hide')
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

          this.props.comment.user_id !== this.props.currentUser.id ?
          <div>
            {this.state.commentLikeButtonView === "show" ?
              <div>
                <Button
                  onClick={this.handleCommentLikeSubmit}
                >like</Button>
              </div>
              :
              //SHOW UNLIKE BUTTON
              <div>
                <div>
                  {this.props.comment.comment_likes.map((like, index)=>{
                    return(
                      <div
                        key={index}
                        like={like} >
                          {like.user_id === this.props.currentUser.id ?
                            <Button onClick={() => {
                                this.props.handleDelete('comment_likes/' + like.id, index, 'comment_likes')
                                this.handleLikeArrayView('commentLikeButtonView', 'show')
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
      </div>
    )
  }



}
