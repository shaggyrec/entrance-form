import React, { Component, ReactNode } from 'react';

interface ErrorInterface {
    message?: string;
}

class ErrorMessage extends Component<ErrorInterface> {
    public render(): ReactNode {
        const { message } = this.props;
        if(!message) {
            return null;
        }
        return <div className="alert alert-danger">{ message }</div>;
    }
}

export default ErrorMessage;
