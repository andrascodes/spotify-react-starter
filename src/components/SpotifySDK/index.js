import React, { Component } from 'react'
import scriptLoader from 'react-async-script-loader'

class SpotifySDK extends Component {
  
  constructor(props) {
    super(props)

    window.onSpotifyWebPlaybackSDKReady = this.initPlayer
  }

  initPlayer = () => {
    console.log('Spotify has loaded')
  }
  
  render() {
    return (
      <div>This is SDK!</div>
    )
  }
}

export default scriptLoader(
  'https://sdk.scdn.co/spotify-player.js'
)(SpotifySDK)