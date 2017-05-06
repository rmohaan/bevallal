'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

class EnsureProtectedAccess extends React.Component {
  constructor () {
    super();
    this.isLoggedIn = () => this._isLoggedIn();
  }

  _isLoggedIn () {
      console.log("Logged",this.props);
      return this.props.numberDetails !== null && this.props.numberDetails.phone;
  }

  componentDidMount() {
    const { dispatch, currentURL } = this.props

    if (!this.isLoggedIn()) {
      // set the current url/path for future redirection (we use a Redux action)
      // then redirect (we use a React Router method)
      dispatch(push("/"))
      //browserHistory.replace("/login")
    }
  }

  render() {
    if (this.isLoggedIn()) {
      return this.props.children
    } else {
      return null
    }
  }
}

// Grab a reference to the current URL. If this is a web app and you are
// using React Router, you can use `ownProps` to find the URL. Other
// platforms (Native) or routing libraries have similar ways to find
// the current position in the app.
function select(state, ownProps) {
  console.log("state from EnsureProtectedAccess" , state, ownProps);
  return {
    numberDetails: state.numberDetails,
    currentURL: ownProps.location.pathname
  }
}

export default connect(select)(EnsureProtectedAccess)
