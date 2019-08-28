import React, { Component } from 'react';
import axios from 'axios';
import List from './components/List';
import Header from './components/Header';



export default class App extends Component {
  constructor(){
    super();

    this.state = {
      currentView: 'users',
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
  handleView = (view) => {
    this.setState({
      currentView: view
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
  // <<<<<<<<< FETCH PHOTOS >>>>>>>>
  // =======================================
  fetchPhotos = () => {
    axios.get('http://localhost:3000/photos')
      .then(response => {
        this.setPhotos(response.data)
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
  // <<<<<<<HANDLE PHOTO DELETE >>>>>>>>
  // =======================================
  handlePhotoDelete = (id, arrayIndex, currentArray) => {
    axios.delete('http://localhost:3000/photos/' + id)
    .then(response => {
      console.log(response.data);
      this.removeFromArray(currentArray, arrayIndex)
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
      this.fetchPhotos()
    })
    .catch(error => {
      console.log(error);
    })
  }


// ======================================
// <<<<<<<<< FOR PHOTOS AND USERS >>>>>>>>
// =======================================
// ======================================
// <<<<<<REMOVE FROM ARRAY>>>>>>>>
// =======================================
  removeFromArray = (array, arrayIndex) => {
    this.setState((prevState) => {
      prevState[array].splice(arrayIndex, 1)
      return {
        [array]: prevState[array]
      }
    })
  }



// ======================================
// <<<<<<<<< USERS FUNCTIONS >>>>>>>>
// =======================================
// ======================================
// <<<<<<<<< FETCH USERS >>>>>>>>
// =======================================
  fetchUsers = () => {
    axios.get('http://localhost:3000/users')
      .then(response => {
        this.setUsers(response.data)
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
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
      if(response.errors){
        this.setState({
          message: response.errors
        })
      }
      else {
        this.setState({
          message: ["user updated successfully"]
        })
      }
    })
    .then(response =>{
      this.fetchUsers()
    })
    .catch(error => {
      console.log(error);
    })
  }


// ======================================
// <<<<<<<<< LOGIN FUNCTIONS >>>>>>>>
// =======================================
// ======================================
// <<<<<<<<< HAANDLE LOGIN >>>>>>>>
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
  // <<<<<<<<< COMPONENT DID MOUNT >>>>>>>>
  // =======================================
  componentDidMount(){
    this.fetchPhotos();
    this.fetchUsers();
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
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
          loggedInStatus={this.state.loggedInStatus}
          currentUser={this.state.currentUser}
          fetchPhotos={this.fetchPhotos}
          fetchUsers={this.fetchUsers}
          handlePhotoCreate={this.handlePhotoCreate}
          handleUserCreate={this.handleUserCreate}
        />
        <List
          currentView={this.state.currentView}
          photos={this.state.photos}
          users={this.state.users}
          handlePhotoDelete={this.handlePhotoDelete}
          handlePhotoUpdate={this.handlePhotoUpdate}
          handleUserDelete={this.handleUserDelete}
          handleUserUpdate={this.handleUserUpdate}
          currentUser={this.state.currentUser}
          message={this.state.message}
          closeMessage={this.closeMessage}

        />

      </div>
    )
  }
// end App class
};
