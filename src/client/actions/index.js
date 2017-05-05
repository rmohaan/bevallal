'use strict';

import * as actionEvents from './events';
import * as dataRequests from './dataRequests';
import { push } from 'react-router-redux';


export function setData (data) {
  return {
    type: actionEvents.SET_DATA,
    payload: data
  };
}

export function setDashboardData (data) {
  return {
    type: actionEvents.SET_DASHBOARD_DATA,
    payload: data
  };
}

export function fetchData () {
  return function (dispatch) {
    // dispatch(fetchingData());
    return dataRequests.fetchData()
       .then(function (response) {
         if (response.status === 200) {
           dispatch(setData(response.data));
         }
       })
       .catch((err) => {
          dispatch(push('/'))
       });
  };
}

export function fetchDashboardData () {
  return function (dispatch) {
    // dispatch(fetchingData());
    return dataRequests.fetchDashboardData()
       .then(function (response) {
         dispatch(setDashboardData(response));
       })
       .catch((err) => {
         console.log(err);
          dispatch(push('/'))
       });
  };
}
