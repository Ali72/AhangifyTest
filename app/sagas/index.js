import {put, takeLatest, all} from 'redux-saga/effects';
import {
  GET_BROWSE_DATA,
  GET_NEW_DATA,
  RECEIVE_BROWSE_DATA,
  RECEIVE_NEW_DATA,
} from '../actions/actionTypes';
import {BASE_URL} from '../constants';
const axios = require('axios');

export function* getNewTracksData() {
  try {
    const response = yield axios.get(BASE_URL + 'tracks');
    console.log(response);
    yield put({
      type: RECEIVE_NEW_DATA,
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
  }
}
export function* getBrowseData() {
  try {
    const response = yield axios.get(BASE_URL + 'browse');
    console.log(response);
    yield put({
      type: RECEIVE_BROWSE_DATA,
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
  }
}
function* newTrackActionWatcher() {
  yield takeLatest(GET_NEW_DATA, getNewTracksData);
}
function* browseActionWatcher() {
  yield takeLatest(GET_BROWSE_DATA, getBrowseData);
}

export default function* rootSaga() {
  yield all([newTrackActionWatcher(), browseActionWatcher()]);
}
