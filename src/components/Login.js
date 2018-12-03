import React, { Component } from 'react';
import logo from './../star-wars-logo-981.png';
import './../App.css';
import Modal from './../Modal.js'
import axios from 'axios';

class Login extends Component {

  state = {
    username : "",
    password : "",
    showModal : false,
    errorMessage : ""

  }

  render() {
    return (
      <div className="App">
        <Modal show = {this.state.showModal} children = {this.state.errorMessage} handleClose = {() => this.setState({showModal : false})} ></Modal>
          <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Start Wars Demo</h1>
          <span>Enter Credentials</span>
          <input className='input-text' type='text' onChange={event => this.setState({username : event.target.value})} placeholder='User Name'></input>
          <br/>
            <input className='input-text' type='password' onChange={event => this.setState({password : event.target.value})} placeholder='Password'></input>
            <br/>
          <button type="submit" className='button-primary' disabled={!(this.state.password && this.state.username)} onClick={this.onLogin}>Login</button>
        </header>
      </div>
    );
  }

  onLogin = () => {
     // fetch("https://swapi.co/api/people/?search=" + this.state.username)
        axios.get("https://swapi.co/api/people/?search=" + this.state.username)
            .then(response => {
          if (response.status !== 200) {
            throw Error(response.statusText);
          }
          return response;
        })
        .then(resp => this.validateLogin(resp.data.results))
        .catch(error => {
          this.setState({
            errorMessage : "Something went wrong. Please try again.",
            showModal : true,
            loading : false
          })
        })
  };

  validateLogin = (users) => {
    var searchedUser = users.length === 1 ? users[0] : null
    if (searchedUser && searchedUser.name === this.state.username && searchedUser.birth_year === this.state.password) {
      localStorage.setItem('user', JSON.stringify(searchedUser));
      this.moveToHomeSceen()
      return
    }
    this.setState({
      errorMessage : "Invalid Username or Password",
      showModal : true

    })
  };

  moveToHomeSceen = () => {
    this.props.history.push("/")
  }

}

export default Login;
