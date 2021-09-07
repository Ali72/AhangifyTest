import {BASE_URL} from '../constants';
const axios = require('axios');

export function getNewTracksData() {
  try {
    const response = axios.get(BASE_URL + 'tracks');
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export function* getBrowseData() {
  try {
    axios
      .get(BASE_URL + 'browse')
      .then(function (response) {
        console.log('response data=>', response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    // return response.data;
  } catch (error) {
    console.error(error);
  }
}
