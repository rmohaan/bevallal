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

  componentWillReceiveProps (newProps) {
    if (newProps.data && newProps.data.phone) {
      if (newProps.data.type === 'partyhall') {
        this.props.dispatch(push('/partyhall'));
      }
      else {
        this.props.dispatch(push('/orphanage'));
      }
    }
    else {
      this.props.dispatch(push('/'));
    }
  }

_checkPhoneNumber (event) {
    event.preventDefault();
    this.props.dispatch(actions.verifyValidNumber(this.state.phone));
}

_handlePhoneInput (event) {
    this.setState({
        phone: event.target.value
    });
}

render () {
  let showClass = this.state.showCount === true ? "form-group" : "hide";
  console.log(showClass, this.state.showCount);
    return (
      <div className="container">
        <form>
          <legend className="text-align-center">Identify yourself</legend>
            <div className="margin-left-8">
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
            <button className="btn btn-success" onClick={this.checkPhoneNumber}>Go</button>
            <button type="button" className="btn btn-secondary float-right margin-right-5">Cancel</button>
            </div>
        </form>
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
