/*global location*/

'use strict';

import axios from 'axios';

axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response !== undefined && error.response.status === 401) {
    location.reload();
  }
  return Promise.reject(error);
});

export function fetchData () {
  return axios({
    method: 'get',
    url: '/api/getData'
  });
}

export function submitData(items) {
  return axios({
    method: 'put',
    url: '/api/submitData',
    data: items
  });
}

export function verifyValidNumber (phoneNumber) {
  return axios({
    method: 'get',
    url: '/api/verifyValidNumber',
    params: {
      "phone": phoneNumber
    }
  });
}

export function getPartyHall (phoneNumber) {
  return axios({
    method: 'get',
    url: '/api/getPartyHall',
    params: {
      "phone": phoneNumber
    }
  });
}

export function getOrphanage (phoneNumber) {
  return axios({
    method: 'get',
    url: '/api/getOrphanage',
    params: {
      "phone": phoneNumber
    }
  });
}

export function getAvailableSurplusFood () {
  return axios({
    method: 'get',
    url: '/api/getAvailableSurplusFood'
  });
}

export function getPreviousIntimations (phoneNumber) {
  return axios({
    method: 'get',
    url: '/api/getPreviousIntimations',
    params: {
      "phone": phoneNumber
    }
  });
}

export function getPreviousRequests (phoneNumber) {
  return axios({
    method: 'get',
    url: '/api/getPreviousRequests',
    params: {
      "phone": phoneNumber
    }
  });
}

export function createPartyHall(items) {
  return axios({
    method: 'post',
    url: '/api/createPartyHall',
    data: items
  });
}

export function createOrphanage(items) {
  return axios({
    method: 'post',
    url: '/api/createOrphanage',
    data: items
  });
}

export function createSurplusFood(items) {
  return axios({
    method: 'post',
    url: '/api/createSurplusFood',
    data: items
  });
}

export function acceptAvailableSurplusFood(items) {
debugger;
  return axios({
    method: 'put',
    url: '/api/acceptAvailableSurplusFood',
    data: items
  });
}

export function fetchDashboardData () {
  return axios.all([
    fetchData()
  ])
  .then(axios.spread(function (responseData) {
    // ... but this callback will be executed only when both requests are complete.
    return {
      data: responseData.data
    };
  }));
}
