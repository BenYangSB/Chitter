
import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'
import { BrowserRouter as Router, Route} from "react-router-dom";
import authMethod from './configs/authMethod'
import Navbar from "./components/navbar.component"
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import axios from 'axios';

import CreateUser from "./components/create-user.component";
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

class App extends React.Component {
  state = { isSignedIn: false }
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
      console.log("user", user)
      
      const userAdd = {
        username: firebase.auth().currentUser.displayName,
        userKey: firebase.auth().currentUser.uid,
        following: [firebase.auth().currentUser.uid],
        followers: 0
      }
    
      axios.post('http://localhost:5000/users/add', userAdd)
        .then(res => console.log(res.data));
  

    })
  }

  render() {
    return (

      <Router>

      { this.state.isSignedIn && 
        console.log(firebase.auth().currentUser.uid)
      }
        {this.state.isSignedIn && 
            <div className="container">


            <div>
                      <Navbar />
                      <br/>
                      <Route path="/" exact component={ExercisesList} />
                      <Route path="/edit/:id" component={EditExercise} />
                      <Route path="/create" component={()=> <CreateExercise userName = {firebase.auth().currentUser.displayName} /> } />
                      <Route path="/user" component={() => <CreateUser userKey = {firebase.auth().currentUser.uid} 
                      
                      />} />

            </div>

            <div className = "logIn">
            </div>
            
          </div>
        }


      {
        <div className="App">
            {this.state.isSignedIn ? (
              <span>
                <div>Signed In!</div>
                <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
                <h1 id = "welcome">Welcome {firebase.auth().currentUser.displayName}</h1>
                <img id = "pfp"
                  alt="profile picture"
                  src={firebase.auth().currentUser.photoURL}
                />
              </span>
            ) : (
              <StyledFirebaseAuth
                uiConfig={this.uiConfig}
                firebaseAuth={firebase.auth()}
              />
            )}
        </div>
        }
      </Router>
     
    )
  }
}

export default App