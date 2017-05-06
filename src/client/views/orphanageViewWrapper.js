/*global document alert*/

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Header from './header';
import Footer from './footer';
import OrphanageView from './orphanageView';
import * as actions from '../actions/index';
import { connect } from 'react-redux';

class OrphanageViewWrapper extends React.Component {

  componentDidMount () {
    this.props.dispatch(actions.getAvailableSurplusFood());
  }

  render () {
      return (
        <div className="container-fluid">
          <Header />
          <div className="container-fluid">
            <div className="row">
                <OrphanageView />
            </div>
          </div>
        </div>
      );
    }
}

export default connect()(OrphanageViewWrapper);
