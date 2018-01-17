import React, { Component } from 'react'
import scriptLoader from 'react-async-script-loader'

class SpotifySDK extends Component {
  
  constructor(props) {
    super(props)

    window.onSpotifyWebPlaybackSDKReady = this.initializeSDK

    this.state = {
      SpotifySDK: undefined,
      playerInstance: undefined,
      playerHasConnected: false,
    }
  }

  initializeSDK = async () => {
    console.log('Spotify has loaded')

    const SpotifySDK = window.Spotify
    const playerInstance = new SpotifySDK.Player({
      name: "My Shiny Player",
      getOAuthToken: callback => {
        // Run code to get a fresh access token
        callback("BQDA_eyGIJu_9CeEIxrq-JZ17eT0zt6eCk1v3JogDiB4Ca6OiTxEjr8xFN0zK1cLlNMmMP8Qccwf6utVPO6UbmoFLBvpOmXLUBzfrd9hHPyHyhh_alo6r8Qv8l-0ZrA5DR2m-PuqkKyvyNehjmKC2sDlngTk2J6w9MXx-g")
      },
      // To Set the Volume upon Player Instantiation
      // volume: 0.5
    })

    playerInstance.on('initialization_error', this.handlePlayerInitializationError)
    playerInstance.on('authentication_error', this.handleAuthenticationError)
    playerInstance.on('account_error', this.handleAccountError)
    playerInstance.on('playback_error', this.handlePlaybackError)
    playerInstance.on('ready', this.handleReadyEvent)
    playerInstance.on('player_state_changed', this.handlePlayerStateChangeEvent)

    try {

      const success = await playerInstance.connect()
      if(success === true) {
        console.log('Spotify has connected...')
        this.setState(state => ({
          SpotifySDK,
          playerInstance
        }))
      }

    } catch(error) {
      console.error(error)
    }

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
  handlePlayerStateChangeEvent = async spotifyPlaybackStateObject => {
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
      <div>Player Components</div>
    )
  }
}

export default scriptLoader(
  'https://sdk.scdn.co/spotify-player.js'
)(SpotifySDK)