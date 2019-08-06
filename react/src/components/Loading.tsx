import React, { Component, ReactNode } from 'react';

interface LoadingInterface {
    loading: boolean;
}

export default class Loading extends Component<LoadingInterface> {
    public render(): ReactNode {
        if (this.props.loading) {
            return (
                <div className="loader">
                    <div className="loader__image"/>
                </div>
            );
        }
        return null;
    }
}
