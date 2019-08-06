import React, { Component, ReactNode } from 'react';

interface LanguageSwitcherInterface {
    switch: () => void;
    buttonText: string;
}

class LanguageSwitcher extends Component<LanguageSwitcherInterface> {
    public render(): ReactNode {
        return (
            <button className="btn text-white" onClick={this.props.switch}>
                {this.props.buttonText}
            </button>
        );
    }
}
export default LanguageSwitcher;

