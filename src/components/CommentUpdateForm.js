import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'


export default class CommentUpdateForm extends Component {
  constructor(props){
    super(props)

    this.state = {
      id: this.props.comment.id,
      body: this.props.comment.body,
      commentUpdateView: "hide"
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
  // <<<<<<<<HANDLE SUBMIT>>>>>>>>
  // ===============================
  handleUpdateSubmit = (event) => {
    event.preventDefault();
    this.props.handleUpdate('comments/', this.state)
    this.handleCommentUpdateView("hide")
    console.log(this.state);
  }



// ===============================
// <<<<<<<HANDLE VIEW UPDATE>>>>>>>>
// ===============================
  handleCommentUpdateView = (view) => {
    this.setState({
      commentUpdateView: view
    })
  }

  // ===============================
  // <<<<<<RENDER>>>>>>>>
  // ===============================
  render(){
    return(
      <div>
        { this.state.commentUpdateView === "hide" ?
          <Button onClick={() => {
            this.setState({
              commentUpdateView: "show"
            })
          }}>Update Comment</Button>
          :
          <div>
            <Modal show>
              <Modal.Dialog>
                <Modal.Header>
                  <Container>
                    <h3>Update Comment</h3>
                  </Container>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={this.handleUpdateSubmit}>
                    <Form.Group>
                      <label>Comment</label>
                    </Form.Group>
                    <Form.Group>
                      <input
                        type="text"
                        name="body"
                        placeholder="comment"
                        value={this.state.body}
                        onChange={this.handleChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group>
                      <Button type="submit">Update Comment</Button>
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Container>
                    <Button onClick={() => {
                      this.setState({
                        commentUpdateView: "hide"
                      })
                    }}>Close</Button>
                  </Container>
                </Modal.Footer>
              </Modal.Dialog>
            </Modal>
          </div>
        }

      </div>
    )
  }
//end class
}
