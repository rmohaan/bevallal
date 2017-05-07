/*global document alert*/

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Header from './header';
import Footer from './footer';
import RequestIntimationsView from './requestIntimationsView';
import * as actions from '../actions/index';
import { connect } from 'react-redux';

class RequestIntimationsWrapper extends React.Component {

  componentDidMount () {
    this.props.dispatch(actions.getPreviousIntimations(this.props.data.phone));
    this.props.dispatch(actions.getPreviousRequests(this.props.data.phone));
  }

  render () {
      return (
        <div className="container-fluid">
          <Header />
          <div className="container-fluid">
            <div className="row">
                <RequestIntimationsView />
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

export default connect(select)(RequestIntimationsWrapper);
