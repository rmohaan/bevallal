/*global document alert*/

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import * as actions from '../actions/index';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import moment from 'moment';
import { Link } from 'react-router';
import Select from 'react-select';
import classNames from 'classnames';

const options = [
    { value: 'velachery', label: 'Velachery' },
    { value: 'adambakkam', label: 'Adambakkam' },
    { value: 'guindy', label: 'Guindy' },
    { value: 'others', label: 'Others' }
];

const typeOptions = [
    { value: 'partyhall', label: 'Party Halls/Function Halls' },
    { value: 'orphanage', label: 'Orphanages/Asylums/Caring Homes' }
];

class RegisterPage extends React.Component {
  constructor () {
    super();
    this.state = {
            phone: '',
            name: '',
            owner_name: '',
            email: '',
            address: '',
            area: '',
            type: '',
            headcount: '',
            showCount: false
    };
    this.createUser = (event) => this._createUser(event);
    this.isValid = () => this._isValid();
    this.handleCancelButton = (event) => this._handleCancelButton(event);
    this.handlePhoneInput = (event) => this._handlePhoneInput(event);
    this.handleNameInput = (event) => this._handleNameInput(event);
    this.handleOwnerNameInput = (event) => this._handleOwnerNameInput(event);
    this.handleEmailInput = (event) => this._handleEmailInput(event);
    this.handleAddressInput = (event) => this._handleAddressInput(event);
    this.handleAreaChange = (event) => this._handleAreaChange(event);
    this.handleTypeChange = (event) => this._handleTypeChange(event);
    this.handleCountChange = (event) => this._handleCountChange(event);
  }

createUserFromState () {
  return {
      phone: this.state.phone,
      name: this.state.name,
      owner_name: this.state.owner_name,
      email: this.state.email,
      address: this.state.address,
      area: this.state.area,
      type: this.state.type,
      count: this.state.showCount === true ? this.state.headcount : 0
  }
}

_isValid() {
  var userDetails = this.createUserFromState();
  if (!this.state.phone) {
    return false;
  }
  if (!this.state.name) {
    return false;
  }
  if (!this.state.owner_name) {
    return false;
  }
  if (!this.state.email) {
    return false;
  }
  if (!this.state.address) {
    return false;
  }
  if (!this.state.area) {
    return false;
  }
}

_createUser (event) {
    event.preventDefault();
    var userDetails = this.createUserFromState();
    console.log(userDetails);
    if (this.isValid()) {
      if (userDetails.type === 'orphanage') {
        this.props.dispatch(actions.createOrphanage(userDetails));
      }
      else if (userDetails.type === 'partyhall') {
        this.props.dispatch(actions.createPartyHall(userDetails));
      }
    } else {
      alert ("All fields are required");
    }

}

_handlePhoneInput (event) {
    this.setState({
        phone: event.target.value
    });
}

_handleNameInput (event) {
    this.setState({
        name: event.target.value
    });
}

_handleOwnerNameInput (event) {
    this.setState({
        owner_name: event.target.value
    });
}

_handleEmailInput (event) {
    this.setState({
        email: event.target.value
    });
}

_handleAddressInput (event) {
    this.setState({
        address: event.target.value
    });
}

_handleAreaChange (event) {
  this.setState ({
    area: event.value
  });
}

_handleTypeChange (event) {
  let truthValue = event.value === 'orphanage',
      url = event.value === 'orphanage' ? '/orphanage' : '/partyhall';

  this.setState ({
    type: event.value,
    showCount: truthValue,
    url: url
  });
}

_handleCountChange (event) {
  this.setState ({
    headcount: event.target.value
  });
}

_handleCancelButton (event) {
  this.props.dispatch(push('/'));
}

render () {
  let showClass = this.state.showCount === true ? "form-group" : "hide";
  console.log(showClass, this.state.showCount);
    return (
      <div className="container">
          <legend className="text-align-center">Register yourself</legend>
            <div className="margin-left-30">
            <div className="form-group">
            <label><b><span className="glyphicon glyphicon-tag"></span>Type</b></label>
              <Select options={typeOptions}
                onChange={this.handleTypeChange}
                value = {this.state.type}
                placeholder="Select an option"
                className="resize-width"
                clearable={false} />
            </div>
            <div className="form-group">
              <label><b><span className="glyphicon glyphicon-phone"></span>Phone number </b></label>
              <input
              type="text"
              placeholder="Enter your phone number"
              name="phone"
              className="form-control resize-width"
              value={this.state.phone}
              onChange={this.handlePhoneInput}
              required />
            </div>
            <div className="form-group">
            <label><b><span className="glyphicon glyphicon-briefcase"> </span>Name</b></label>
            <input
              type="text"
              placeholder="Enter your organization/home name"
              name="name"
              className="form-control resize-width"
              value={this.state.name}
              onChange={this.handleNameInput}
              required />
            </div>
            <div className="form-group">
            <label><b><span className="glyphicon glyphicon-user"></span>Owner Name</b></label>
            <input
              type="text"
              placeholder="Enter your name"
              name="owner-name"
              className="form-control resize-width"
              value={this.state.owner_name}
              onChange={this.handleOwnerNameInput}
              required />
            </div>
            <div className="form-group">
            <label><b><span className="glyphicon glyphicon-envelope"> </span>Email</b></label>
            <input
              type="text"
              placeholder="Enter your email address"
              name="email"
              className="form-control resize-width"
              value={this.state.email}
              onChange={this.handleEmailInput}
              required />
            </div>
            <div className="form-group">
            <label><b><span className="glyphicon glyphicon-home"> </span>Address</b></label>
            <input
              type="text"
              placeholder="Enter your home's address"
              name="address"
              className="form-control resize-width"
              value={this.state.address}
              onChange={this.handleAddressInput}
              required />
            </div>
            <div className="form-group">
            <label><b><span className="glyphicon glyphicon-tag"></span>Area</b></label>
              <Select options={options}
                onChange={this.handleAreaChange}
                value = {this.state.area}
                placeholder="Select an option"
                className="resize-width"
                clearable={false} />
            </div>
            <div className={showClass}>
              <label><b><span className=""></span>Total number of pupil in home</b></label>
              <input
              type="text"
              placeholder="Enter number of people in home"
              name="head-count"
              className="form-control resize-width"
              value={this.state.headcount}
              onChange={this.handleCountChange}
               />
            </div>
            <button className="btn btn-success" onClick={this.createUser}>Submit Details</button>
            <button type="button" className="btn btn-primary float-right margin-right-37" onClick={this.handleCancelButton}>Cancel</button>
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

export default connect(select)(RegisterPage);
