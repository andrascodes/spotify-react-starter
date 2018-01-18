
// TODO: initialize the Spotify lib with the client_id and redirect_uri as these will not change
// pass the accessToken with every request that needs it, OR initalize with that too

const createLoginLink = ({ client_id, redirect_uri, scopes }) => {

  const scopes_encoded = scopes.reduce((acc, curr) => `${acc} ${curr}`).replace(/\s/g, "%20")

  return [
    "https://accounts.spotify.com/authorize",
    `?client_id=${client_id}`,
    `&redirect_uri=${redirect_uri}`,
    `&scope=${scopes_encoded}`,
    "&response_type=token",
    "&show_dialog=true"
  ].join('')
}

const createPlayer = ({ SpotifySDK, accessToken, playerName, eventHandlers }) => {
  
  const player = new SpotifySDK.Player({
    name: playerName,
    getOAuthToken: callback => {
      // Run code to get a fresh access token
      callback(accessToken)
    },
    // To Set the Volume upon Player Instantiation
    // volume: 0.5
  })

  player.on('initialization_error', eventHandlers.handlePlayerInitializationError)
  player.on('authentication_error', eventHandlers.handleAuthenticationError)
  player.on('account_error', eventHandlers.handleAccountError)
  player.on('playback_error', eventHandlers.handlePlaybackError)
  player.on('ready', eventHandlers.handleReadyEvent)
  player.on('player_state_changed', eventHandlers.handlePlayerStateChangeEvent)

  return player.connect()
          .then(success => {
            if(success === true) {
              return player
            }
            else {
              return Promise.reject(new Error('The WebPlayback SDK could not connnect to Spotify.'))
            }
          })
}

const Spotify = {
  createLoginLink,
  createPlayer
}

// const newSpotifyAPI = ({
//   clientId,
//   redirectUri,
//   loginUri,
//   authErrorCallback
// }) => ({

// })

export default Spotify