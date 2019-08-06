import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import FormContainer from '../components/FormContainer';
import LocalisedComponent from '../dataTypes/LocalisedComponent';
import localize from '../l18n';
import {
    CHOOSE_IMAGE,
    IMAGE,
    NEW_IMAGE_FIELD_HINT,
    REGISTRATION,
    REQURED_FIELDS
} from '../l18n/messages';
import FormField from '../components/FormField';
import { fields, isFormValid, register, setField } from '../ducks/entrance';
import { Dispatch } from 'redux';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import FileFormField from '../components/FileFormField';

interface RegistrationInterface extends LocalisedComponent {
    isFormValid: boolean;
    setField: (name: string, value: string) => void;
    fields: object;
    loading: boolean;
    submit: () => void;
    serverError: string;
}

class Registration extends Component<RegistrationInterface> {

    public constructor(props) {
        super(props);
        if (!props.fields.email.value) {
            props.history.push('/entrance');
        }
    }

    private readonly requiredFieldsList = [
        'password', 'name', 'lastname', 'phone'
    ];

    private handleFieldChange = (name: string, value: string): void => {
        this.props.setField(name, value);
    };

    public render(): ReactNode {
        const { language, isFormValid, fields, serverError } = this.props;
        return (
            <FormContainer
                onSubmit={this.props.submit}
                language={language}
                title={localize(REGISTRATION, language)}
                disabled={!isFormValid}
            >
                <ErrorMessage message={serverError}/>
                <Loading loading={this.props.loading}/>
                {this.requiredFieldsList.map((name: string): ReactNode => (
                    <FormField
                        key={`${name}field`}
                        type={name === 'password' ? 'password': 'text'}
                        name={name}
                        label={localize(name.toUpperCase(), language) + '*'}
                        hint={localize(`NEW_${name.toUpperCase()}_FIELD_HINT`, language)}
                        onChange={this.handleFieldChange.bind(this, name)}
                        error={fields[name].error}
                        placeholder={name === 'phone' ? '+7 (911) - 222 - 33 - 44': ''}
                        value={fields[name].value || ''}
                    />
                ))}
                <FileFormField
                    label={localize(IMAGE, language)}
                    hint={localize(NEW_IMAGE_FIELD_HINT, language)}
                    name="image"
                    buttonText={localize(CHOOSE_IMAGE, language)}
                    onChange={this.handleFieldChange.bind(this, 'image')}
                />
                <p>* - {localize(REQURED_FIELDS, language)}</p>
            </FormContainer>
        );
    }
}

export default connect(
    (state): object => ({
        language: state.application.language,
        isFormValid: isFormValid(state),
        fields: fields(state),
        loading: state.entrance.loading,
        serverError: state.entrance.error
    }),
    (dispatch: Dispatch): object => ({
        setField: (name, value): Dispatch => dispatch(setField(name, value)),
        submit: (): Dispatch => dispatch(register())
    })
)(Registration);
