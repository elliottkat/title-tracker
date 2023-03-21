import { all, call, takeLatest, put } from 'redux-saga/effects';
import { FetchSuccessPayload, CommonFetch } from './CommonTypes';
import { FETCH_DOGS_REQUEST, ADD_DOG_REQUEST, EDIT_DOG_REQUEST, REMOVE_DOG_REQUEST } from './Dogs/DogActionTypes';

import {
    FETCH_TITLES_REQUEST,
    ADD_TITLE_REQUEST,
    EDIT_TITLE_REQUEST,
    REMOVE_TITLE_REQUEST,
} from './Titles/TitleActionTypes';

export function* fetchDataSaga(data: CommonFetch): Generator {
    console.log('data:', data);
    const { type, apiCb, successCb, errorCb, params } = data;

    try {
        // If there isn't an API to fetch from, do nothing.
        // This is used when this saga also accepts SETs that cancel FETCHs.
        if (apiCb) {
            const result = yield call(apiCb, params);
            const response: FetchSuccessPayload<any> = {
                data: result as any,
            };
            yield put(successCb(type.replace('_REQUEST', '_SUCCESS'), response));
        }
    } catch (e) {
        // FastAPI can return data.detail when raising HTTPException to describe an API failure
        // eslint-disable-next-line
        // @ts-ignore
        const error_message = e.response?.data?.detail ?? e.message;
        yield put(errorCb(type.replace('_REQUEST', '_FAILURE'), error_message));
    }
}

export function* CommonSaga(): Generator {
    yield all([
        takeLatest(FETCH_DOGS_REQUEST, fetchDataSaga),
        takeLatest(ADD_DOG_REQUEST, fetchDataSaga),
        takeLatest(EDIT_DOG_REQUEST, fetchDataSaga),
        takeLatest(REMOVE_DOG_REQUEST, fetchDataSaga),
        takeLatest(FETCH_TITLES_REQUEST, fetchDataSaga),
        takeLatest(ADD_TITLE_REQUEST, fetchDataSaga),
        takeLatest(EDIT_TITLE_REQUEST, fetchDataSaga),
        takeLatest(REMOVE_TITLE_REQUEST, fetchDataSaga),
    ]);
}
