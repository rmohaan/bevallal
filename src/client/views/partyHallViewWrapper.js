/*global document alert*/

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Header from './header';
import Footer from './footer';
import PartyHallView from './partyHallView';
import * as actions from '../actions/index';
import { connect } from 'react-redux';

class PartyHallViewWrapper extends React.Component {

  componentDidMount () {
    this.props.dispatch(actions.getPreviousIntimations());
  }

  render () {
      return (
        <div className="container-fluid">
          <Header />
          <div className="container-fluid">
            <div className="row">
                <PartyHallView />
            </div>
          </div>
        </div>
      );
    }
}

export default connect()(PartyHallViewWrapper);
