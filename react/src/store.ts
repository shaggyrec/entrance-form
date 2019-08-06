import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, createStore, Reducer, Store } from 'redux';
import { SagaMiddleware } from 'redux-saga';

export default function configureStore(rootReducer: Reducer, initialState: object, history: History, sagas: SagaMiddleware): Store {
    return createStore(
        rootReducer,
        initialState || {},
        applyMiddleware(sagas, routerMiddleware(history))
    );
}
