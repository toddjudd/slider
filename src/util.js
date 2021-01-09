import axios from 'axios';

export function loadPickDetails(taskId) {
  //use taskid in get request
  return axios.get('http://localhost:7900/pick').catch((err) => {
    console.log(err);
  });
}

export function getValidPickLocations(taskId) {
  //use taskid in get request
  return axios.get('http://localhost:7900/locations').catch((err) => {
    console.log(err);
  });
}

export function getValidPickLicensePlates(taskId, sourceLoc) {
  //use taskid in get request
  return axios.get('http://localhost:7900/licensePlate').catch((err) => {
    console.log(err);
  });
}

export function validateActualLocationAndLicensePlate(
  taskId,
  sourceLoc,
  sourceLp
) {
  //use taskid in get request
  return axios
    .get('http://localhost:7900/licensePlate/validate')
    .catch((err) => {
      console.log(err);
    });
}

export function capitalize(s) {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function trueIfNull(x) {
  return x === null ? false : !x;
}
