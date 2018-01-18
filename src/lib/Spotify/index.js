
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

const Spotify = {
  createLoginLink
}

const newSpotifyAPI = ({
  clientId,
  redirectUri,
  loginUri,
  authErrorCallback
}) => ({
  
})

export default Spotify