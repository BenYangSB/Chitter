import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    // this.onFollow = this.onFollow.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      users: [],
      currentUser: null
    }
  }


  onFollow = (input) =>{

    if(input.userKey == this.state.userKey || this.state.currentUser == null || this.state.currentUser == undefined)
      return;

    // console.log(this.state.currentUser);
    let temp = (this.state.currentUser.following);
    // console.log(temp);
    if(!temp.includes(input.userKey)){
        temp.push(input.userKey)

        console.log(temp);
        const userUpdatedFollow = {
          username: this.state.currentUser.username,
          userKey: this.state.currentUser.userKey,
          following: temp,
        }

        axios.post('http://localhost:5000/users/update/' + this.state.currentUser._id, userUpdatedFollow)
        .then(res => console.log(res.data));
    }
  }
  componentDidMount() {
    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user ),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

      console.log(this.state.currentUser);

      axios.get('http://localhost:5000/users/' + this.props.userKey)
      .then(response => {
        if (response.data != null && response.data.length > 0) {
          this.setState({
            currentUser: response.data[0],
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

      console.log(this.state.currentUser);



  }
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username
    }

    console.log(user);

    axios.post('http://localhost:5000/users/add', user)
      .then(res => console.log(res.data));

    this.setState({
      username: ''
    })
  }

  render() {
    return (
      <div>
              {
                this.state.users.map((user)=> {
                  return <div class= "follow">  
                      {user.username}
                      <button id = "followBtn" onClick = {()=> this.onFollow(user)}>Follow!</button>                
                  </div>;
                })
              }
      </div>
    )
  }
}