import React, { Component, ReactNode, Fragment } from 'react';
import { connect } from 'react-redux';
import Profile from '../components/Profile';
import LocalisedComponent from '../dataTypes/LocalisedComponent';
import localize from '../l18n';
import { LOGOUT, PROFILE } from '../l18n/messages';
import Language from '../dataTypes/Language';
import UserSchema from '../dataTypes/UserSchema';
import { Dispatch } from 'redux';
import { fetch, logout } from '../ducks/user';
import Loading from '../components/Loading';

interface HomeInterface extends LocalisedComponent{
    language: Language;
    user: UserSchema;
    token: string;
    fetch: () => Dispatch;
    logout: () => Dispatch;
}

class Home extends Component<HomeInterface> {

    public constructor(props) {
        super(props);
        if (!props.token) {
            props.history.push('/entrance');
        }
        if (!props.user) {
            this.props.fetch()
        }
    }

    private static renderProfile(language, user: UserSchema): ReactNode {
        return (
            <div className="card">
                <div className="card-body">
                    {!user && <Loading loading/>}
                    <Profile language={language} {...user}/>
                </div>
            </div>
        );
    }
    public render(): ReactNode {
        const { language, user } = this.props;
        return (
            <Fragment>
                <h1 className="text-white">{localize(PROFILE, language)}</h1>
                {Home.renderProfile(language, user)}
                <div className="my-2">
                    <button
                        className="btn btn-raised btn-danger"
                        onClick={this.props.logout}
                    >
                        {localize(LOGOUT, language)}
                    </button>
                </div>
            </Fragment>
        );
    }
}

export default connect(
    (state): object => ({
        language: state.application.language,
        user: state.user.current,
        token: state.application.authToken
    }),
    (dispatch: Dispatch): object => ({
        fetch: (): Dispatch => dispatch(fetch()),
        logout: (): Dispatch => dispatch(logout())
    })
)(Home);
