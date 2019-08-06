import { combineReducers, Reducer } from 'redux';
import user, { initialState as userInitialState  } from './user';
import application, { initialState as applicationInitialState } from './application';
import entrance, { initialState as entranceInitialState } from './entrance';

export default (router: any = null): Reducer => combineReducers({
    router,
    application,
    entrance,
    user
});

export const initialState = {
    user: userInitialState,
    application: applicationInitialState,
    entrance: entranceInitialState
};
