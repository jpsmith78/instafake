import React, { Component } from 'react';
import axios from 'axios';
import List from './components/List';
import Header from './components/Header';



export default class App extends Component {
  constructor(){
    super();

    this.state = {
      currentView: 'users',
      photoFormView: 'hide',
      userFormView: 'hide',
      users: [],
      photos: [],
      loggedInStatus: "NOT LOGGED IN",
      currentUser: {},
      message: []
    }
  };


  // ======================================
  // <<<<<<<<<<HANDLE VIEW FUNCTION >>>>>>>>
  // =======================================
  handleView = (target, view) => {
    this.setState({
      [target]: view
    })
  }


  // ======================================
  // <<<<<<<<<<CLOSE MESSAGE FUNCTION >>>>>>>>
  // =======================================
  closeMessage = () => {
    this.setState({
      message: []
    })
  }
  // ======================================
  // <<<<<<<<< PHOTOS FUNCTIONS >>>>>>>>
  // =======================================
  // ======================================
  // <<<<<<HANDLE FETCH URL>>>>>>>
  // =======================================
  handleFetchUrl = (route) => {
    axios.get('http://localhost:3000/' + route)
      .then(response => {
        if(route === 'photos'){
          this.setPhotos(response.data)
        }else if (route === 'users'){
          this.setUsers(response.data)
        }
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      })
  }

  // ======================================
  // <<<<<<<<< SET PHOTOS >>>>>>>>
  // =======================================
  setPhotos = (photo) => {
    this.setState({
      photos: photo
    })
  }

  // ======================================
  // <<<<<<SET USERS>>>>>>>>
  // =======================================
  setUsers = (user) => {
    this.setState({
      users: user
    })
  }

  // ======================================
  // <<<<<<<HANDLE PHOTO CREATE >>>>>>>>
  // =======================================
  handlePhotoCreate = (data) => {
    if (!data.errors) {
      this.setState({
        message: ["photo created"]
      })
      console.log(this.state.message);
    }else {
      this.setState({
        message: data.errors
      })
      console.log(this.state.message);
    }
  }

  // ======================================
  // <<<<<<<HANDLE DELETE FUNCTION>>>>>>>>
  // =======================================
  handleDelete = (id, arrayIndex, currentArray) => {
    axios.delete('http://localhost:3000/' + id)
    .then(response => {
      console.log(response.data)
      this.handleFetchUrl('photos')
      this.handleFetchUrl('users')
      this.setState({
        message: [response.data.success]
      })
    })
    .catch(error => {
      console.log(error);
    })
  }


  // ======================================
  // <<<<<<<HANDLE PHOTO UPDATE >>>>>>>>
  // =======================================
  handlePhotoUpdate = (photo, arrayIndex, currentArray) => {

    fetch('http://localhost:3000/photos/' + photo.id, {
      body: JSON.stringify(photo),
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'

      }
    })
    .then(response => {
      return response.json()
    })
    .then(response => {
      if(response.errors){
        this.setState({
          message: response.errors
        })
      }
      else {
        this.setState({
          message: ["photo updated successfully"]
        })
      }
    })
    .then(response =>{
      this.handleFetchUrl('photos')
    })
    .catch(error => {
      console.log(error);
    })
  }







// ======================================
// <<<<<<<<< USERS FUNCTIONS >>>>>>>>
// =======================================





// ======================================
// <<<<<<<HANDLE USER CREATE >>>>>>>>
// =======================================
  handleUserCreate = (data) => {
    if (!data.errors) {
      this.setState({
        message: ["user created"]
      })
      console.log(this.state.message);
    }else {
      this.setState({
        message: data.errors
      })
      console.log(this.state.message);
    }
  }

// ======================================
// <<<<<<<<HANDLE USER DELETE>>>>>>>>
// =======================================
  handleUserDelete = (id, arrayIndex, currentArray) => {
    axios.delete('http://localhost:3000/users/' + id)
    .then(response => {
      console.log(response.data);
      this.setState({
        message: ["user successfully deleted"]
      })
      this.removeFromArray(currentArray, arrayIndex)


    })
    .catch(error => {
      console.log(error);
    })
  }

  // ======================================
  // <<<<<<<<HANDLE USER UPDATE>>>>>>>>
  // =======================================
  handleUserUpdate = (user, arrayIndex, currentArray) => {

    fetch('http://localhost:3000/users/' + user.id, {
      body: JSON.stringify(user),
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'

      }
    })
    .then(response => {
      return response.json()
    })
    .then(response => {
      console.log(response);
      if(response.errors){
        this.setState({
          message: response.errors
        })
      }
      else {
        this.setState({
          message: ["user updated successfully"],
          currentUser: response
        })
      }
      this.handleFetchUrl('users')
    })
    .catch(error => {
      console.log(error);
    })
  }



// ======================================
// <<<<<<<<< LOGIN FUNCTIONS >>>>>>>>
// =======================================
// ======================================
// <<<<<<<<< HANDLE LOGIN >>>>>>>>
// =======================================
  handleLogin = (data) => {
    if(data.logged_in){
      this.setState({
        loggedInStatus: "LOGGED IN",
        currentUser: data.user,
        message: ["Login Successful"]
      })
    }else {
      this.setState({
        message: ["Incorrect Login"]
      })
    }

  }

// ======================================
// <<<<<<<<< HANDLE LOGOUT >>>>>>>>
// =======================================
  handleLogout = () => {
    this.setState({
      loggedInStatus: "NOT LOGGED IN",
      currentUser: {},
      message: ["Logout Success"]
    })
  }

  handleLogoutClick(){
    axios.delete("http://localhost:3000/logout", {withCredentials: true}).then(response => {
      this.handleLogout();
    }).catch(error => {
      console.log("logout error", error);
    })
  }
// ======================================
// <<<<<<<CHECK LOGIN STATUS >>>>>>>>
// =======================================
  checkLoginStatus = () => {
    axios.get("http://localhost:3000/logged_in", { withCredentials: true})
      .then(response =>{
        if (response.data.logged_in && this.state.loggedInStatus === "NOT LOGGED IN") {
          this.setState({
            loggedInStatus: "LOGGED IN",
            currentUser: response.data.user
          })
        }else if (!response.data.logged_in && this.state.loggedInStatus === "LOGGED IN"){
          this.setState({
            loggedInStatus: "NOT LOGGED IN",
            currentUser: {}
          })
        }

      })
        .catch(error => {
          console.log("check login error", error);
      });
  }



  // ======================================
  // <<<<<<<<< LIKE FUNCTIONS>>>>>>>>
  // =======================================
  // ======================================
  // <<<<<<<<< HANDLE LIKE CREATE>>>>>>>>
  // =======================================
  handleLikeCreate = (data) => {
    if(data.warning){
      this.setState({
        message: [data.warning]
      })
    }
    else if(data.errors){
      this.setState({
        message: [data.errors]
      })
    }
    else {
      this.setState({
        message: ["you have liked this"]
      })
    }
  }


  // ======================================
  // <<<<<<<<< HANDLE LIKE DELETE>>>>>>>>
  // =======================================
  handleLikeDelete = (id, arrayIndex, likesArray) => {
    axios.delete('http://localhost:3000/likes/' + id)
    .then(response => {
      console.log(response.data);
      this.setState({
        message: ["You have unliked this"]
      })
      this.handleFetchUrl('photos')
    })
    .catch(error => {
      console.log(error);
    })
  }


  // ======================================
  // <<<<<<<<< COMMENT FUNCTIONS>>>>>>>>
  // =======================================
  // ======================================
  // <<<<<<<<< HANDLE COMMENT CREATE>>>>>>>>
  // =======================================
  handleCommentCreate = (data) => {
    if (!data.errors) {
      this.setState({
        message: ["comment created"]
      })
      console.log(this.state.message);
    }else {
      this.setState({
        message: data.errors
      })
      console.log(this.state.message);
    }
  }


  // ======================================
  // <<<<<<<HANDLE COMMENT UPDATE >>>>>>>>
  // =======================================
  handleCommentUpdate = (comment, arrayIndex, commentsArray) => {

    fetch('http://localhost:3000/comments/' + comment.id, {
      body: JSON.stringify(comment),
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'

      }
    })
    .then(response => {
      return response.json()
    })
    .then(response => {
      console.log(response);
      if(response.errors){
        this.setState({
          message: response.errors
        })
      }
      else {
        this.setState({
          message: ["comment updated successfully"]
        })
      }
    })
    .then(response =>{
      this.handleFetchUrl('photos')
    })
    .catch(error => {
      console.log(error);
    })
  }





  // ======================================
  // <<<<<<<<< COMPONENT DID MOUNT >>>>>>>>
  // =======================================
  componentDidMount(){
    this.handleFetchUrl('photos');
    this.handleFetchUrl('users');
    this.checkLoginStatus();
  }



  // ======================================
  // <<<<<<<<<<<< RENDER >>>>>>>>>>>
  // =======================================
  render(){
    return(
      <div>
        <Header
          handleView={this.handleView}
          photoFormView={this.state.photoFormView}
          userFormView={this.state.userFormView}
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
          handleLogoutClick={this.handleLogoutClick}
          loggedInStatus={this.state.loggedInStatus}
          currentUser={this.state.currentUser}
          handleFetchUrl={this.handleFetchUrl}
          handlePhotoCreate={this.handlePhotoCreate}
          handleUserCreate={this.handleUserCreate}
        />
        <List
          currentView={this.state.currentView}
          photos={this.state.photos}
          users={this.state.users}
          handleFetchUrl={this.handleFetchUrl}
          handleDelete={this.handleDelete}
          handlePhotoUpdate={this.handlePhotoUpdate}
          handleUserDelete={this.handleUserDelete}
          handleLogoutClick={this.handleLogoutClick}
          handleUserUpdate={this.handleUserUpdate}
          handleLikeCreate={this.handleLikeCreate}
          handleLikeDelete={this.handleLikeDelete}
          handleCommentCreate={this.handleCommentCreate}
          handleCommentUpdate={this.handleCommentUpdate}
          currentUser={this.state.currentUser}
          message={this.state.message}
          closeMessage={this.closeMessage}
        />

      </div>
    )
  }
// end App class
};
