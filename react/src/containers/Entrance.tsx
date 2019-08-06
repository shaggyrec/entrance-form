import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import FormField from '../components/FormField';
import FormContainer from '../components/FormContainer';
import LocalisedComponent from '../dataTypes/LocalisedComponent';
import localize from '../l18n';
import { EMAIL_FORM_INPUT, EMAIL_FORM_INPUT_HINT, LOGIN_REGISTRATION } from '../l18n/messages';
import * as entranceActions from '../ducks/entrance';
import Loading from '../components/Loading';
import UserSchema from '../dataTypes/UserSchema';

interface EntranceInterface extends LocalisedComponent {
    change: (email: string) => Dispatch;
    submit: () => Dispatch;
    email: string;
    error: string;
    loading: boolean;
    user: UserSchema;
    token: string;
}

class Entrance extends Component<EntranceInterface> {
    public constructor(props) {
        super(props);
        if (props.token) {
            props.history.push('/');
        }
    }
    private handleSubmit = (): void => {
        this.props.submit();
    };

    private handleEmailChange = (value: string): void => {
        this.props.change(value);
    };

    public render(): ReactNode {
        const { language, email, error } = this.props;
        return (
            <FormContainer
                language={language}
                title={localize(LOGIN_REGISTRATION, language)}
                onSubmit={this.handleSubmit}
                disabled={!email || !!error}
            >
                <Loading loading={this.props.loading}/>
                <FormField
                    label={localize(EMAIL_FORM_INPUT, language)}
                    name="email"
                    placeholder="name@example.com"
                    hint={localize(EMAIL_FORM_INPUT_HINT, language)}
                    onChange={this.handleEmailChange}
                    error={error}
                />
            </FormContainer>
        );
    }
}

export default connect(
    (state): object => ({
        language: state.application.language,
        email: state.entrance.fields.email.value,
        error: state.entrance.fields.email.error,
        loading: state.entrance.loading,
        user: state.user.current,
        token: state.application.authToken
    }),
    (dispatch: Dispatch): object => ({
        change: (email: string): Dispatch => dispatch(entranceActions.setField('email', email)),
        submit: (): Dispatch => dispatch(entranceActions.checkEmail())
    })
)(Entrance);
