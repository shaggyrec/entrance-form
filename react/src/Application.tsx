import React, { Component } from 'react';
import { ConnectedRouter, connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './ducks';
import rootSaga from './sagas';
import store from './store';
import Home from './containers/Home';
import Entrance from './containers/Entrance';
import Header from './containers/Header';
import Registration from './containers/Registration';
import Login from './containers/Login';

interface ApplicationInterface {
    state: object;
}

export default class Application extends Component<ApplicationInterface> {
    private readonly store: any;
    private readonly history: History;

    public constructor(props: { state: object }) {
        super(props);
        this.history = createBrowserHistory();
        const sagas = createSagaMiddleware();
        this.store = this.configureStore(this.history, props.state, connectRouter(this.history), sagas);
        sagas.run(rootSaga);
    }

    private configureStore = (history: any, state: object = {}, router: any = null, sagas: any = null): any => (
        store(rootReducer(router), state, history, sagas)
    );

    public render(): any {
        return(
            <Provider store={this.store}>
                <ConnectedRouter history={this.history}>
                    <Header/>
                    <div className="container py-5">
                        <Switch>
                            <Route path="/" exact component={Home}/>
                            <Route path="/entrance" exact component={Entrance}/>
                            <Route path="/registration" exact component={Registration}/>
                            <Route path="/login" exact component={Login}/>
                        </Switch>
                    </div>
                </ConnectedRouter>
            </Provider>
        );
    }
}


