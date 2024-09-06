import { call, put, takeEvery, ForkEffect } from 'redux-saga/effects';
import axios from 'axios';
import { anotherAction } from './exampleSlice';

interface AnotherData {
  id: number;
  name: string;
  description: string; 
  createdAt: string;   
}

interface ApiResponse {
  data: AnotherData[];  
}

function* anotherSaga(): Generator<any, void, ApiResponse> {
  try {
    const response: ApiResponse = yield call(axios.get, 'https://api.example.com/another-data');

    yield put(anotherAction(response.data));
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
  }
}

export function* watchAnotherData(): Generator<ForkEffect<never>, void, unknown> {
  yield takeEvery('ANOTHER_ACTION_REQUEST', anotherSaga);
}
