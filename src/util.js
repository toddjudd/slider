import axios from 'axios';

export function loadPickDetails() {
  //use taskid in get request
  return axios.get('http://localhost:7900/picks').catch((err) => {
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
