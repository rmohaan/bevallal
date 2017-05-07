/*global document alert*/

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import * as actions from '../actions/index';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import moment from 'moment';
import { Link } from 'react-router';
import classNames from 'classnames';

class HomePage extends React.Component {
  constructor () {
    super();
    this.state = {
            phone: ''
    };
    this.checkPhoneNumber = (event) => this._checkPhoneNumber(event);
    this.handlePhoneInput = (event) => this._handlePhoneInput(event);
  }

_checkPhoneNumber (event) {
    event.preventDefault();
    if (this.state.phone && this.state.phone.length === 10) {
      this.props.dispatch(actions.verifyValidNumber(this.state.phone));
    }
    else {
      alert("Valid Phone number is must");
    }
}

_handlePhoneInput (event) {
    this.setState({
        phone: event.target.value
    });
}

render () {
  let showClass = this.state.showCount === true ? "form-group" : "hide";
    return (
      <div className="container margin-top-15">
            <div className="margin-left-25">
            <div className="form-group">
              <label><b><span className="glyphicon glyphicon-phone"></span>Phone number</b></label>
              <input
              type="text"
              placeholder="Enter your phone number"
              name="phone"
              className="form-control resize-width"
              value={this.state.phone}
              onChange={this.handlePhoneInput}
              required />
            </div>
            <button className="btn btn-success float-right margin-right-42 width-125px" onClick={this.checkPhoneNumber}>Go</button>
            </div>
      </div>
    );
  }
}

function select (state) {
  return {
    data: state.numberDetails
  };
}

export default connect(select)(HomePage);
