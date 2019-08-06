import { call, ForkEffect, put, takeEvery, select } from '@redux-saga/core/effects';
import api from '../api';
import * as userActions from '../ducks/user';
import { authToken, setToken } from '../ducks/application';
import { push } from 'connected-react-router';

function* fetchProcess(): IterableIterator<any> {
    try {
        const token = yield select(authToken);
        const user = yield call(api , '/me', {
            headers: { 'X-Auth-Token': token }
        });
        yield put(userActions.fetchSuccess(user));
    } catch (e) {
        yield put(userActions.failure(e.message));
        yield put(setToken(null));
        yield put(push('/entrance'));
    }
}

function* logoutProcess(): IterableIterator<any> {
    yield put(setToken(null));
    localStorage.removeItem('entrance-form.token');
    yield put(push('/entrance'));
}

export function* watchFetch(): IterableIterator<ForkEffect> {
    yield takeEvery(userActions.FETCH, fetchProcess);
}

export function* watchLogout(): IterableIterator<ForkEffect> {
    yield takeEvery(userActions.LOGOUT, logoutProcess);
}
