import { all } from 'redux-saga/effects';
import * as user from './user';
import * as entrance from './entrance';

export default function* rootSaga(): any {
    yield all([
        user.watchFetch(),
        user.watchLogout(),
        entrance.watchCheckEmail(),
        entrance.watchChangeField(),
        entrance.watchLogin(),
        entrance.watchRegistration()
    ]);
}
