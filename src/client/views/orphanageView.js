/*global document alert*/

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import * as actions from '../actions/index';
import { connect } from 'react-redux';

function convertToArray (data) {
  if (typeof data === 'object') {
    data = $.map(data, function(value, index) {
       return [value];
    });
  }
  return data;
}

class OrphanageView extends React.Component {

  constructor ()  {
    super();
    this.generateSurplusFoodLayout = (list, cols) => this._generateSurplusFoodLayout(list, cols);
    this.generateNoDataFound = () =>  this._generateNoDataFound();
    this.handleRequest = (event, item) => this._handleRequest(event, item);
  }

  _handleRequest (event, item) {
    event.preventDefault();
    var foodDetails = {
      offerer_phone: item.offerer_phone,
      count: item.count,
      receiver_phone: this.props.data.phone
    }
    event.target.textContent = "Requested";
    this.props.dispatch(actions.acceptAvailableSurplusFood(foodDetails));
  }

  _generateNoDataFound () {
    return <div> No Data Found </div>;
  }

  _generateSurplusFoodLayout (list, text) {
    return list.map((item, index) => {
            return (
              <div className="row" key={index}>
                <div className="col">
                  <div>
                  <span> {item.name ? item.name : "Anonymous"} </span>
                  <span> {item.count} </span>
                  <span>
                    <button className="btn btn-success"
                        disabled={this.props.acceptStatus.status}
                        onClick={(event) => this.handleRequest(event, item)} >
                        {text} </button>
                  </span>
                  </div>
                </div>
                <hr className="hr-styling"/>
              </div>
            );
    });
  }

render () {

    let list = this.props.surplusFoodList,
        text = this.props.acceptStatus &&  this.props.acceptStatus.status === true ? "Request Approved" : 'Request';
    list = typeof list === 'object' ? convertToArray(list) : list;
    if (list.length > 0) {
      list = this.generateSurplusFoodLayout(list, text);
    }
    else {
      list = this.generateNoDataFound();
    }
    return (
    <div className="cardRender">
      <legend className="text-align-center">Orphanage - {this.props.data.name}</legend>
      {list}
    </div>
    );
  }
}

function select (state) {
  console.log("state from orphanageView", state);
  return {
    data: state.numberDetails,
    surplusFoodList: state.surplusFoodList,
    acceptStatus: state.requestAcceptStatus
  };
}

export default connect(select)(OrphanageView);
