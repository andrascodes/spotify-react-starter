import React, { Component } from 'react'

class Login extends Component {

  componentDidMount() {
    // Check if an accessToken exists in localStorage
    const accessToken = window.localStorage.getItem('spotify_access_token')

    // Check if the URI contains the accessToken
    const hashExists = window.location.hash.length > 0

    // Set the accessToken or extract the accessToken from the URI after the Hash
    if(accessToken !== null) {
      this.props.onSuccessfulAuthorization(accessToken)
    }
    else if(hashExists === true) {
      let hash = window.location.hash
        .substring(1)
        .split('&')
        .reduce((acc, curr) => {
          const [identifier, value] = curr.split('=')
          acc[identifier] = value
          return acc
        }, {})
      
      // Clean off the accessToken from behind the Hash
      window.location.hash = ""

      // ERROR: Cleaning with setTimeout will get lost if there's a browserRefresh
      // Should clean the localStorage when there's an error with the accessToken, and then reroute to login
      // setTimeout(() => {
      //   window.localStorage.removeItem('spotify_access_token')
      //   this.handleAccessTokenExpiry()
      // }, hash.expires_in * 1000)

      window.localStorage.setItem('spotify_access_token', hash.access_token)
      this.props.onSuccessfulAuthorization(hash.access_token)
    }
    else {
      // Redirect to Spotify Login
      // const loginLink = this.getLoginLink()
      // window.location = loginLink
    }
  }

  handleLoginClick = () => {
    window.location = this.props.loginLink
  }

  render() {
    return (
      <a onClick={this.handleLoginClick} >Login Button</a>
    )
  }

}

export default Login