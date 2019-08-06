import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import FormContainer from '../components/FormContainer';
import localize from '../l18n';
import { LOGIN, PASSWORD } from '../l18n/messages';
import Loading from '../components/Loading';
import FormField from '../components/FormField';
import { Dispatch } from 'redux';
import * as entranceActions from '../ducks/entrance';
import LocalisedComponent from '../dataTypes/LocalisedComponent';
import ErrorMessage from '../components/ErrorMessage';


interface LoginInterface extends LocalisedComponent {
    change: (email: string) => Dispatch;
    submit: () => Dispatch;
    password: string;
    error: string;
    loading: boolean;
    serverError: string;
    email: string;
}

class Login extends Component<LoginInterface> {
    public constructor(props) {
        super(props);
        if (!props.email) {
            props.history.push('/entrance');
        }
    }

    private handleSubmit = (): void => {
        this.props.submit();
    };

    private handlePasswordChange = (value: string): void => {
        this.props.change(value);
    };

    public render(): ReactNode {
        const { language, password, error, serverError } = this.props;
        return (
            <FormContainer
                language={language}
                title={localize(LOGIN, language)}
                onSubmit={this.handleSubmit}
                disabled={!password || !!error}
            >
                <ErrorMessage message={serverError}/>
                <Loading loading={this.props.loading}/>
                <FormField
                    label={localize(PASSWORD, language)}
                    name="password"
                    type="password"
                    onChange={this.handlePasswordChange}
                    error={error}
                />
            </FormContainer>
        );
    }
}
export default connect(
    (state): object => ({
        language: state.application.language,
        password: state.entrance.fields.password.value,
        error: state.entrance.fields.password.error,
        loading: state.entrance.loading,
        serverError: state.entrance.error,
        email: state.entrance.fields.email.value
    }),
    (dispatch: Dispatch): object => ({
        change: (email: string): Dispatch => dispatch(entranceActions.setField('password', email)),
        submit: (): Dispatch=> dispatch(entranceActions.login())
    })
)(Login);
