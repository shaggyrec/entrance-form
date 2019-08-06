import React, { Component, ReactNode } from 'react';
import localize from '../l18n';
import { NEXT_STEP } from '../l18n/messages';
import LocalisedComponent from '../dataTypes/LocalisedComponent';

interface FormContainerInterface extends LocalisedComponent{
    title?: string;
    onSubmit: () => void;
    disabled?: boolean;
}

class FormContainer extends Component<FormContainerInterface> {

    private handleSubmit = (e): void => {
        e.preventDefault();
        this.props.onSubmit();
    };

    public render(): ReactNode {
        const { title, children, language, disabled } = this.props;
        return (
            <form className="card auth-from" onSubmit={this.handleSubmit}>
                {title &&
                    <div className="card-header bg-dark text-white">
                        <h1 className="card-title m-0">{title}</h1>
                    </div>
                }
                <div className="card-body">
                    { children }
                    <div className="text-right">
                        <button className="btn btn-raised btn-primary" disabled={disabled}>
                            { localize(NEXT_STEP, language) }
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

export default FormContainer;
