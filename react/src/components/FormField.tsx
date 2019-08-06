import React, { Component, ReactNode } from 'react';

interface FormFieldFormInterface {
    onChange: (value: string) => void;
    error?: string;
    name: string;
    autoFocus?: boolean;
    placeholder?: string;
    type?: string;
    hint?: string;
    value?: string;
    label: string;
}

class FormField extends Component<FormFieldFormInterface> {

    private handleChange = ({ target: { value } }): void => {
        this.props.onChange(value);
    };


    public render(): ReactNode {
        return (
            <div className="form-group">
                <label htmlFor={this.props.name}>{this.props.label}</label>
                <input
                    type={this.props.type || 'text'}
                    className={`form-control ${this.props.error ? 'form-control--invalid' : ''}`}
                    id={this.props.name}
                    placeholder={this.props.placeholder}
                    autoFocus={this.props.autoFocus}
                    onChange={this.handleChange}
                    value={this.props.value}
                />
                <span className={`bmd-help ${this.props.error ? 'error' : ''}`}>
                    {this.props.error || this.props.hint || ''}
                </span>
            </div>
        );
    }
}

export default FormField;
