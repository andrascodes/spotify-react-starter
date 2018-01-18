import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Login, SpotifyPlayer } from './components'

import { Spotify } from './lib'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      accessToken: undefined
    }
  }

  handleSuccessfulAuthorization = accessToken => {
    this.setState(state => ({
      accessToken
    }))
  }

  handleAccessTokenExpiry = () => {

    window.localStorage.removeItem('spotify_access_token')

    this.setState(state => ({
      accessToken: undefined
    }))
  }

  getLoginLink = () => {
    return Spotify.createLoginLink({
      client_id: 'aebef636319e43c795dca607c62d1a5a',
      redirect_uri: 'http://localhost:3000/',
      scopes: [ 'streaming', 'user-read-birthdate', 'user-read-email', 'user-read-private', 'user-modify-playback-state' ]
    })
  }

  componentDidMount() {

  }

  // Render login component when accessToken is undefined, pass the current URL as a prop
  // else render SpotifySDK with the accessToken
  render() {
    
    const renderComponents = (state) => {
      if(state.accessToken === undefined) {
        // render Login component
        return (
          <Login 
            onSuccessfulAuthorization={this.handleSuccessfulAuthorization} 
            loginLink={this.getLoginLink()}
          />
        )
      }
      else {
        return (
          <div>
            <p>Logged in with {state.accessToken}</p>
            <SpotifyPlayer accessToken={state.accessToken}/>
          </div>
        )
      }
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {
          renderComponents(this.state)
        }
      </div>
    );
  }
}

export default App;
