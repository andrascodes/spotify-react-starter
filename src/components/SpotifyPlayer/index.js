import React, { Component } from 'react'
import scriptLoader from 'react-async-script-loader'

import Player from './Player'

import { Spotify } from '../../lib'

class SpotifyPlayer extends Component {
  
  constructor(props) {
    super(props)

    window.onSpotifyWebPlaybackSDKReady = this.initializeSDK

    this.state = {
      player: undefined,
      playerHasConnected: false,
    }
  }

  initializeSDK = async () => {
    console.log('Spotify has loaded')

    const SpotifySDK = window.Spotify
    const player = await Spotify.createPlayer({
      SpotifySDK,
      accessToken: this.props.accessToken,
      playerName: 'My Shiny Player',
      eventHandlers: {
        handleReadyEvent: this.handleReadyEvent,
        handlePlayerStateChangeEvent: this.handlePlayerStateChangeEvent,
        handlePlayerInitializationError: this.handlePlayerInitializationError,
        handleAuthenticationError: this.handleAuthenticationError,
        handlePlaybackError: this.handlePlaybackError,
      }
    })

    this.setState(state => ({
      player
    }))

  }

  // SDK Events
  // Event when the Spotify player has successfully connected and ready to stream
  handleReadyEvent = data => {
    const { device_id } = data
    console.log("Connected with Device ID", device_id)

    this.setState(state => ({
      playerHasConnected: true
    }))
  }

  // Event when the state of the playback has changed
  handlePlayerStateChangeEvent = spotifyPlaybackStateObject => {
    if(spotifyPlaybackStateObject === null) {
      console.log('Spotify Player was transferred to another device')
    }
    else {
      const {
        position,
        duration,
        track_window: { current_track }
      } = spotifyPlaybackStateObject
    
      console.log("Currently Playing", current_track)
      console.log("Position in Song", position)
      console.log("Duration of Song", duration)
    }
  }

  // SDK Errors
  // Error while initializing the Player
  handlePlayerInitializationError = event => {
    console.error("Failed to initialize", event.message)
  }
  
  // Error authenticating the user with the access token
  handleAuthenticationError = event => {
    console.error("Failed to authenticate", event.message)
  }

  // Error with the account (not a Premium user)
  handleAccountError = event => {
    console.error("Failed to validate Spotify account", event.message)
  }

  // Error while loading or playing back track
  handlePlaybackError = event => {
    console.error("Failed to perform playback", event.message)
  }

  
  render() {
    return (
      <Player />
    )
  }
}

export default scriptLoader(
  'https://sdk.scdn.co/spotify-player.js'
)(SpotifyPlayer)