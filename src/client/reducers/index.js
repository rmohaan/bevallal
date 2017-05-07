'use strict';

import * as actionEvents from '../actions/events';

export function numberDetails (state, action) {
  let actionType = action.type,
      newState = Object.assign({}, state);

  if (actionType === actionEvents.SET_NUMBER_VALIDITY) {
    newState = action.payload;
  }

  return newState;
}

export function surplusFoodList (state, action) {
  let actionType = action.type,
      newState = Object.assign({}, state);

  if (actionType === actionEvents.SET_SURPLUS_FOOD_LIST) {
    newState = action.payload;
  }

  return newState;
}

export function requestAcceptStatus (state, action) {
  let actionType = action.type,
      newState = Object.assign({}, state);

  if (actionType === actionEvents.SET_REQUEST_ACCEPT_STATUS) {
    newState = action.payload;
  }

  return newState;
}

export function setPartyHall (state, action) {
  let actionType = action.type,
      newState = Object.assign({}, state);

  if (actionType === actionEvents.SET_PARTY_HALL) {
    newState = action.payload;
  }

  return newState;
}

export function setIntimationStatus (state, action) {
  let actionType = action.type,
      newState = Object.assign({}, state);

  if (actionType === actionEvents.SET_INTIMATION_STATUS) {
    newState = action.payload;
  }

  return newState;
}

export function setPreviousIntimations (state, action) {
  let actionType = action.type,
      newState = Object.assign({}, state);

  if (actionType === actionEvents.SET_PREVIOUS_INTIMATIONS) {
    newState = action.payload;
  }

  return newState;
}

export function setPreviousRequests (state, action) {
  let actionType = action.type,
      newState = Object.assign({}, state);

  if (actionType === actionEvents.SET_PREVIOUS_REQUESTS) {
    newState = action.payload;
  }

  return newState;
}
