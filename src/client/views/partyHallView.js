/*global document alert*/

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import * as actions from '../actions/index';
import { connect } from 'react-redux';
import Header from './header';
import { push } from 'react-router-redux';
import RequestIntimationsWrapper from './requestIntimationsWrapper'

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

class PartyHallView extends React.Component {
  constructor () {
    super();

    this.state = {
      count: ''
    };
    this.handleFoodIntimation = (event) => this._handleFoodIntimation(event);
    this.handleCountInput = (event) => this._handleCountInput(event);
    this.handleCancelButton = (event) => this._handleCancelButton(event);
    this.getDefaultContent = () => this._getDefaultContent();
    this.getInitmatedStatus = (dataContent) => this._getInitmatedStatus(dataContent);
  }

  _handleCountInput (event) {
    this.setState({
        count: event.target.value
    });
  }

  _handleFoodIntimation (event) {
    var foodDetails = {
      offerer_phone: this.props.data.phone,
      name: this.props.data.name,
      count: this.state.count
    }
    this.props.dispatch(actions.createSurplusFood(foodDetails));
  }

    _handleCancelButton (event) {
      this.props.dispatch(push('/'));
    }

_getDefaultContent(){
  return (
    <div className="container">
    <Header />
    <div className="margin-left-15">
        <div className="margin-left-8">
          <label className="margin-left-25">
              <h3>
                {this.props.data.name} - {this.props.data.area.capitalize()}
              </h3>
          </label>
          <hr className="margin-right-20"/>
          <div className="margin-left-10">
              <label><b><span className=""></span>Approximate # of Pupil-Food </b></label>
              <input
              type="text"
              placeholder="Enter # of people can be fed"
              className="form-control resize-width"
              value={this.state.count}
              onChange={this.handleCountInput}
              />

            <button className="btn btn-success margin-top-10px" onClick={this.handleFoodIntimation}>Intimate Food Surplus</button>
            <button type="button" onClick={this.handleCancelButton} className="btn btn-secondary float-right margin-right-34 margin-top-10px">Cancel</button>
          </div>
        </div>
    </div>
    </div>
  );
}

_getInitmatedStatus(dataContent){
  // return(
  //   <div>Intimated food</div>
  // );
  //this.props.dispatch(push('/register'));
}

render () {
  let content = {};
  if(this.props.status._id){
    this.getInitmatedStatus(this.props.status);
  }
  else{
    content = this.getDefaultContent();
  }
  return (
    <div className="container">
      {content}
      <hr />
      <RequestIntimationsWrapper />
    </div>
  );
  }
}

function select (state) {
  console.log("state from PartyHallView", state);
  return {
    data: state.numberDetails,
    status: state.intimationStatus,
    previousInitmations: state.previousInitmationList
  };
}

export default connect(select)(PartyHallView);
