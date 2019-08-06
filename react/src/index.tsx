import React from 'react';
import ReactDOM from 'react-dom';
import { currentScript } from './functions';
import 'bootstrap-material-design/dist/css/bootstrap-material-design.min.css';
import './st.css';
import Application from './Application';
import { initialState } from './ducks';

const mountElement = document.getElementById('app');

const state = {
    ...initialState,
    application: {
        ...initialState.application,
        authToken: localStorage.getItem('entrance-form.token') || null
    }
};

ReactDOM.render(
    // @ts-ignore
    <Application state={state} />,
    mountElement || currentScript().parentNode
);

