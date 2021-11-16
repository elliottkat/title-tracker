import { all, fork } from 'redux-saga/effects';
import { CommonSaga } from './CommonSaga';

export function* RootSaga(): Generator {
    yield all([
        fork(CommonSaga),
    ]);
}
