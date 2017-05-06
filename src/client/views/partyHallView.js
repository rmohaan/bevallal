/*global document alert*/

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import * as actions from '../actions/index';
import { connect } from 'react-redux';

class PartyHallView extends React.Component {
  constructor () {
    super();
    this.state = {
      foodCount: ''
    };
    this.handleFoodIntimation = (event) => this._handleFoodIntimation(event);
    this.handleFoodCountInput = (event) => this._handleFoodCountInput(event);
  }

  _handleFoodCountInput (event) {
    this.setState({
        foodCount: event.target.value
    });
  }

  _handleFoodIntimation (event) {
    var foodDetails = {
      offerer_phone: this.props.data.phone,
      name: this.props.data.name,
      count: this.state.foodCount
    }
    this.props.dispatch(actions.createSurplusFood(foodDetails));
  }

render () {
    return (
      <div className="container">
        <form>
          <legend className="text-align-center">PartyHall - {this.props.data.name}</legend>
            <div className="margin-left-8">
            <div className="form-group">
              <label><b><span className=""></span>Approximate # of Pupil-Food </b></label>
              <input
              type="text"
              placeholder="Enter # of people can be fed"
              name="foodCount"
              className="form-control resize-width"
              value={this.state.foodCount}
              onChange={this.handleFoodCountInput}
              />
            </div>
            <button className="btn btn-success" onClick={this.handleFoodIntimation}>Intimate Food Surplus</button>
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

export default connect(select)(PartyHallView);
