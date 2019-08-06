import { call, ForkEffect, put, takeEvery, select } from '@redux-saga/core/effects';
import { push } from 'react-router-redux';
import * as entranceActions from '../ducks/entrance';
import { language, setToken } from '../ducks/application';
import api from '../api';
import {
    assertPhoneIsValid,
    assertRequiredFieldIsNotEmpty,
    assertEmailIsValid,
    formatPhone
} from '../functions';
import NotFound from '../errors/NotFound';
import { fields, fieldValue, setField } from '../ducks/entrance';
import localize from '../l18n';

export function* checkEmailProcess(): IterableIterator<any> {
    try {
        const email = yield select(fieldValue, 'email');

        yield call(api, '/check-email', {
            method: 'POST',
            body: JSON.stringify({ email })
        });
        yield put(entranceActions.setRegistered(true));
        yield put(push('/login'));
    } catch (e) {
        if (e instanceof NotFound) {
            yield put(entranceActions.setRegistered(false));
            yield put(push('/registration'));
            return;
        }
        yield put(entranceActions.failure(e.message));
    }
}

function* changeFieldProcess(action): IterableIterator<any> {
    const { name, value } = action.payload;
    try {
        const lang = yield select(language);
        assertRequiredFieldIsNotEmpty(value, lang);
        if (name === 'email') {
            assertEmailIsValid(value, lang);
        }
        if (name === 'phone') {
            const formattedPhone = formatPhone(value);
            if (formattedPhone !== value) {
                yield put(setField(name, formattedPhone));
            }
            assertPhoneIsValid(formattedPhone, lang);
        }
        yield put(entranceActions.setFieldValid(name));
    } catch (e) {
        yield put(entranceActions.setFieldInvalid(name, e.message));
    }
}

function* loginProcess(): IterableIterator<any> {
    const fieldsList = ['email', 'password'];
    const filledFields = yield select(fields);
    const [ email, password ] = fieldsList.map((name): string => filledFields[name].value);

    try {
        const token = yield call(api, '/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
        yield put(setToken(token));
        localStorage.setItem('entrance-form.token', token);
        yield put(push('/'));
    } catch (e) {
        const lang = yield select(language);
        const message = localize(e.message, lang) || e.message;
        yield put(entranceActions.failure(message));
    }

}

function* registerProcess(): IterableIterator<any> {

    const filledFields = yield select(fields);
    let registrationData = {};
    for (const field in filledFields) {
        if (filledFields[field].value) {
            registrationData[field] = filledFields[field].value;
        }
    }
    try {
        const token = yield call(api, '/register', {
            method: 'POST',
            body: JSON.stringify(registrationData)
        });
        yield put(setToken(token));
        localStorage.setItem('entrance-form.token', token);
        yield put(push('/'));
    } catch (e) {
        yield put(entranceActions.failure(e.message));
    }
}

export function* watchCheckEmail(): IterableIterator<ForkEffect> {
    yield takeEvery(entranceActions.CHECK_EMAIL, checkEmailProcess);
}

export function* watchChangeField(): IterableIterator<ForkEffect> {
    yield takeEvery(entranceActions.SET_FIELD, changeFieldProcess);
}

export function* watchLogin(): IterableIterator<ForkEffect> {
    yield takeEvery(entranceActions.LOGIN, loginProcess);
}

export function* watchRegistration(): IterableIterator<ForkEffect> {
    yield takeEvery(entranceActions.REGISTER, registerProcess);
}

