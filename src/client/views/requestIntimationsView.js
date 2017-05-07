/*global document alert*/

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import * as actions from '../actions/index';
import { connect } from 'react-redux';
import Header from './header';
import { push } from 'react-router-redux';
import moment from 'moment';

function convertToArray (data) {
  if (typeof data === 'object') {
    data = $.map(data, function(value, index) {
       return [value];
    });
  }
  return data;
}


class RequestIntimationsView extends React.Component {
  constructor () {
    super();
    this.getInitmatedStatus = (data) => this._getInitmatedStatus (data);
    this.generateNoDataFound = () =>  this._generateNoDataFound();
  }

_getDefaultContent(){
  return (
    <div className="container">
    <Header />
    <div>
        <div className="margin-left-8">
        <div className="form-group">
          <label><b><span className=""></span>{this.props.data.name} - {this.props.data.area}</b></label>
          <br/>
          <label><b><span className=""></span>Approximate # of Pupil-Food </b></label>
          <input
          type="text"
          placeholder="Enter # of people can be fed"
          name="count"
          className="form-control resize-width"
          value={this.state.count}
          onChange={this.handleCountInput}
          />
        </div>
        <button className="btn btn-success" onClick={this.handleFoodIntimation}>Intimate Food Surplus</button>
        <button type="button" onClick={this.handleCancelButton} className="btn btn-secondary float-right margin-right-5">Cancel</button>
        </div>
    </div>
    </div>
  );
}

_getInitmatedStatus(list){
  return list.map((item, index) => {
          let date = moment(item.createdOn).format('DD-MMM-YYYY HH:mm:ss').toString(),
              curr = moment.utc().diff(date, 'hours');
          return (
            <div className="row" key={index}>
              <div className="col-md-3">
                {item.name}
              </div>
                <div className="col-md-3"> {item.count} </div>
                <div className="col-md-3"> {date} </div>
                <div className="col-md-3"> {item.receiver_phone ? item.receiver_phone : (curr < 4 ? "Not yet requested" : "Expired")} </div>
              <hr className="hr-styling"/>
            </div>
          );
  });
}

_generateNoDataFound () {
  return <div> No Data Found </div>;
}

render () {
  let previousIntimations = this.props.previousIntimations || [],
      content = "Request intimation sent successfully";
  previousIntimations = typeof previousIntimations === 'object' ? convertToArray(previousIntimations) : previousIntimations;
  if (previousIntimations.length > 0) {
      previousIntimations = previousIntimations.filter(item => item.name !== undefined);
      content = this.getInitmatedStatus(previousIntimations);
  }
  else {
    content = this.generateNoDataFound();
  }
  return (
    <div className="container-fluid">
      <h3 className="margin-left-35">{this.props.data.name+"'s"} Donation History</h3>
      <hr />
      {content}
    </div>
  );
  }
}

function select (state) {
  console.log("state from requestIntimations", state);
  return {
    data: state.numberDetails,
    status: state.intimationStatus,
    previousIntimations: state.previousInitmationList,
    previousRequests: state.previousRequests
  };
}

export default connect(select)(RequestIntimationsView);
