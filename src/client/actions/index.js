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

export function setNumberValidity (data) {
  return {
    type: actionEvents.SET_NUMBER_VALIDITY,
    payload: data
  };
}

export function setSurplusFoodList (data) {
  return {
    type: actionEvents.SET_SURPLUS_FOOD_LIST,
    payload: data
  };
}

export function setAcceptStatus (data) {
  return {
    type: actionEvents.SET_REQUEST_ACCEPT_STATUS,
    payload: data
  };
}

export function setPartyHall (data) {
  return {
    type: actionEvents.SET_PARTY_HALL,
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

export function verifyValidNumber (phoneNumber) {
  return function (dispatch) {
    // dispatch(fetchingData());
    return dataRequests.verifyValidNumber(phoneNumber)
       .then(function (response) {
         dispatch(setNumberValidity(response.data));
       })
       .catch((err) => {
         console.log(err);
          dispatch(push('/'))
       });
  };
}

export function getPartyHall (phoneNumber) {
  return function (dispatch) {
    // dispatch(fetchingData());
    return dataRequests.getPartyHall(phoneNumber)
       .then(function (response) {
         console.log(response);
         dispatch(setPartyHall(response.data));
       })
       .catch((err) => {
         console.log(err);
          dispatch(push('/'))
       });
  };
}

export function getOrphanage (phoneNumber) {
  return function (dispatch) {
    // dispatch(fetchingData());
    return dataRequests.getOrphanage(phoneNumber)
       .then(function (response) {
         console.log(response);
         //dispatch(setDashboardData(response));
       })
       .catch((err) => {
         console.log(err);
          dispatch(push('/'))
       });
  };
}

export function getAvailableSurplusFood (phoneNumber) {
  return function (dispatch) {
    // dispatch(fetchingData());
    return dataRequests.getAvailableSurplusFood(phoneNumber)
       .then(function (response) {
         console.log(response);
         dispatch(setSurplusFoodList(response.data));
       })
       .catch((err) => {
         console.log(err);
          dispatch(push('/'))
       });
  };
}

export function createPartyHall (userDetails) {
  return function (dispatch) {
    // dispatch(fetchingData());
    return dataRequests.createPartyHall(userDetails)
       .then(function (response) {
         console.log(response);
         //dispatch(setDashboardData(response));
       })
       .catch((err) => {
         console.log(err);
          dispatch(push('/'))
       });
  };
}

export function createOrphanage (userDetails) {
  return function (dispatch) {
    // dispatch(fetchingData());
    return dataRequests.createOrphanage(userDetails)
       .then(function (response) {
         console.log(response);
         dispatch(push("/orphanage"));
       })
       .catch((err) => {
         console.log(err);
          dispatch(push('/'))
       });
  };
}

export function createSurplusFood (foodDetails) {
  return function (dispatch) {
    // dispatch(fetchingData());
    return dataRequests.createSurplusFood(foodDetails)
       .then(function (response) {
         console.log(response);
         //dispatch(setDashboardData(response));
       })
       .catch((err) => {
         console.log(err);
          dispatch(push('/'))
       });
  };
}

export function acceptAvailableSurplusFood (foodDetails) {

  console.log("acceptAvailableSurplusFood ", foodDetails);
  return function (dispatch) {
    // dispatch(fetchingData());
    return dataRequests.acceptAvailableSurplusFood(foodDetails)
       .then(function (response) {
         console.log(response);
         dispatch(setAcceptStatus(response.data));
       })
       .catch((err) => {
         console.log(err);
          dispatch(push('/'))
       });
  };
}
