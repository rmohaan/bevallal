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

export function setUser (data) {
  return {
    type: actionEvents.SET_PARTY_HALL,
    payload: data
  };
}

export function setIntimationStatus (data) {
  return {
    type: actionEvents.SET_INTIMATION_STATUS,
    payload: data
  };
}

export function setPreviousIntimations(data){
  return {
    type: actionEvents.SET_PREVIOUS_INTIMATIONS,
    payload: data
  };
}

export function setPreviousRequests(data){
  return {
    type: actionEvents.SET_PREVIOUS_REQUESTS,
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

export function verifyValidNumber (phoneNumber) {
  return function (dispatch) {
    // dispatch(fetchingData());
    return dataRequests.verifyValidNumber(phoneNumber)
       .then(function (response) {
         if (response.data) {
           var type = response.data.type === 'orphanage' ? '/orphanage' : '/partyhall';
           dispatch(setNumberValidity(response.data));
           dispatch(push(type));
         } else {
           dispatch(push("/register"));
         }

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
         dispatch(setUser(response.data));
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

export function getPreviousIntimations (phoneNumber) {
  return function (dispatch) {
    // dispatch(fetchingData());
    return dataRequests.getPreviousIntimations(phoneNumber)
       .then(function (response) {
         console.log(response);
         dispatch(setPreviousIntimations(response.data));
       })
       .catch((err) => {
         console.log(err);
          dispatch(push('/'))
       });
  };
}

export function getPreviousRequests (phoneNumber) {
  return function (dispatch) {
    // dispatch(fetchingData());
    return dataRequests.getPreviousRequests(phoneNumber)
       .then(function (response) {
         console.log(response);
         dispatch(setPreviousRequests(response.data));
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
         dispatch(setUser(response.data));
         dispatch(push("/partyhall?phone=" + response.data.phone));
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
         dispatch(setUser(response.data));
         dispatch(push("/orphanage?phone=" + response.data.phone));
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
         //dispatch(setIntimationStatus(response.data));
         dispatch(push("/requestIntimations"));
       })
       .catch((err) => {
         console.log(err);
          dispatch(push('/'))
       });
  };
}

export function createSurplusFoodold (foodDetails) {
  return function (dispatch) {
    // dispatch(fetchingData());
    return dataRequests.createSurplusFood(foodDetails)
       .then(function (response) {
         console.log(response);
         dispatch(setIntimationStatus(response.data));
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
