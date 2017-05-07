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

class RequestAcceptedView extends React.Component {
  constructor () {
    super();
    this.getInitmatedStatus = (data) => this._getInitmatedStatus (data);
    this.generateNoDataFound = () =>  this._generateNoDataFound();
  }

_getInitmatedStatus(list){
  return list.map((item, index) => {
          let date = moment(item.createdOn).format('DD-MMM-YYYY HH:mm:ss').toString();
          return (
            <div className="row" key={index}>
              <div className="col-md-4">
                {item.name}
              </div>
                <div className="col-md-2"> {item.count} </div>
                <div className="col-md-2"> {date} </div>
                <div className="col-md-2"> {item.offerer_phone ? item.offerer_phone : "Not requested"} </div>
              <hr className="hr-styling"/>
            </div>
          );
  });
}

_generateNoDataFound () {
  return <div> No Data Found </div>;
}

render () {
  let previousIntimations = this.props.previousRequests || [],
      content = "Request intimation sent successfully";
  previousIntimations = typeof previousIntimations === 'object' ? convertToArray(previousIntimations) : previousIntimations;
  console.log(previousIntimations);
  if (previousIntimations.length > 0) {
      previousIntimations = previousIntimations.filter(item => item.name !== undefined);
      content = this.getInitmatedStatus(previousIntimations);
  }
  else {
    content = this.generateNoDataFound();
  }
  return (
    <div>
      <h3 className="margin-left-35">{this.props.data.name}</h3>
      <div className="text-align-center availableDon">  Sucessful Request History </div>
      <hr />
      {content}
    </div>
  );
  }
}

function select (state) {
  console.log("state from requestAcceptedView", state);
  return {
    data: state.numberDetails,
    status: state.intimationStatus,
    previousIntimations: state.previousInitmationList,
    previousRequests: state.previousRequestsList
  };
}

export default connect(select)(RequestAcceptedView);
