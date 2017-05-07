/*global document alert*/

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Header from './header';
import Footer from './footer';
import RequestAcceptedView from './requestAcceptedView';
import * as actions from '../actions/index';
import { connect } from 'react-redux';

class RequestAcceptedWrapper extends React.Component {

  componentDidMount () {
    console.log("from requestAcceptedWrapper", this.props);
    this.props.dispatch(actions.getPreviousRequests(this.props.data.phone));
  }

  render () {
      return (
        <div className="container-fluid">
          <Header />
          <div className="container-fluid">
            <div className="row">
                <RequestAcceptedView />
            </div>
          </div>
        </div>
      );
    }
}

function select (state) {
  console.log("state from orphanageView", state);
  return {
    data: state.numberDetails
  };
}

export default connect(select)(RequestAcceptedWrapper);
