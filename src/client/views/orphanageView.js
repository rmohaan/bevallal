/*global document alert*/

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import * as actions from '../actions/index';
import { connect } from 'react-redux';
import RequestAcceptedWrapper from './requestAcceptedWrapper';

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
    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }
    this.generateSurplusFoodLayout = (list, cols) => this._generateSurplusFoodLayout(list, cols);
    this.generateNoDataFound = () =>  this._generateNoDataFound();
    this.generateRequestedLayout = (data) => this._generateRequestedLayout(data);
    this.handleRequest = (event, item) => this._handleRequest(event, item);
  }

  _handleRequest (event, item) {
    event.preventDefault();
    var foodDetails = {
      offerer_phone: item.offerer_phone,
      count: item.count,
      id: item._id,
      receiver_phone: this.props.data.phone
    }
    this.props.dispatch(actions.acceptAvailableSurplusFood(foodDetails));
  }

  _generateNoDataFound () {
    return <div> No Data Found </div>;
  }

  _generateRequestedLayout(data){
    if (data && data.receiver_phone === this.props.data.phone){
      return (
          <div className="panel panel-success">
            <div className="panel-heading text-align-center">Request approved for {data.offerer_phone}</div>
          </div>
        );
    } else {
      return (
        <div className="panel panel-danger">
          <div className="panel-heading text-align-center">Sorry, Request declined</div>
        </div>
      );
    }
  }

  _generateSurplusFoodLayout (list, text) {
    return list.map((item, index) => {
            return (
              <div className="row" key={index}>
                <div className="col-md-6 orphanage-list">
                  <div className="col-md-4">
                   {item.name}
                   </div>
                    <div className="col-md-4"> {item.count} </div>
                    <div className="col-md-4">
                      <button className="btn btn-success request-button"
                          onClick={(event) => this.handleRequest(event, item)} >
                          <span> {this.props.acceptStatus && this.props.acceptStatus.data
                            && item._id === this.props.acceptStatus.data.id ? 'Requested' : 'Request'} </span>
                          </button>
                    </div>
                    <hr className="hr-styling"/>
                    </div>

              </div>
            );
    });
  }

render () {

    let list = this.props.surplusFoodList,
        text = this.props.acceptStatus &&  this.props.acceptStatus.status === true ? "Request" : 'Request';
    list = typeof list === 'object' ? convertToArray(list) : list;
console.log("from render acceptstatus", this.props.acceptStatus);
    if(this.props.acceptStatus && this.props.acceptStatus.data){
      debugger;
      list = this.generateRequestedLayout(this.props.acceptStatus.data);
    }
    else if(this.props.acceptStatus && this.props.acceptStatus.success === false){
      debugger;
      list = this.generateRequestedLayout(this.props.acceptStatus.data);
    }
    else if (list.length > 0) {
      list = list.filter(item => item.name !== undefined);
      list = this.generateSurplusFoodLayout(list, text);
    }
    else {
      list = this.generateNoDataFound();
    }
    return (
    <div className="row">

        <div className="col-md-12">
          <div className="col-md-6">
            <div className="margin-left-10">
              <h3> {this.props.data.name} - {this.props.data.owner_name} - {this.props.data.area.capitalize()} - {this.props.data.phone}</h3>
            </div>
            <hr className="width-100"/>
            {list}
          </div>
          <div className="col-md-6">
            <RequestAcceptedWrapper />
          </div>
        </div>

    </div>
    );
  }
}

function select (state) {
  console.log("state from orphanageView", state);
  return {
    data: state.numberDetails,
    surplusFoodList: state.surplusFoodList,
    acceptStatus: state.requestAcceptStatus,
    previousRequests: state.previousRequestsList
  };
}

export default connect(select)(OrphanageView);
