/*global document alert*/

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Header from './header';
import Footer from './footer';
import RegisterPage from './registerPage';
import HomePage from './homePage';
import * as actions from '../actions/index';
import { connect } from 'react-redux';

class Home extends React.Component {

  render () {
      return (
        <div className="container-fluid">
          <Header />
          <div className="container-fluid">
            <div className="row">
                <HomePage />
            </div>
          </div>
        </div>
      );
    }
}

export default connect()(Home);
