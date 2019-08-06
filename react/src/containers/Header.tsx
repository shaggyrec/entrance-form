import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { Dispatch } from 'redux';
import { switchToEnglish, switchToRussian } from '../ducks/application';
import Language from '../dataTypes/Language';
import localize from '../l18n';
import { SWITCH_LANGUAGE } from '../l18n/messages';

interface HeaderInterface {
    language: Language;
    switchLang: (language: Language) => Dispatch;
}

class Header extends Component<HeaderInterface> {
    private switchLang = (): void => {
        this.props.switchLang(this.props.language);
    };

    public render(): ReactNode {
        return (
            <nav className="navbar">
                <div className="container">
                    <div className="navbar-brand text-white">auth form</div>
                    <div className="ml-auto">
                        <LanguageSwitcher switch={this.switchLang} buttonText={localize(SWITCH_LANGUAGE, this.props.language)}/>
                    </div>
                </div>
            </nav>
        );
    }
}

export default connect(
    (state): object => ({
        language: state.application.language
    }),
    (dispatch: Dispatch): object => ({
        switchLang: (currentLanguage: string): Dispatch => dispatch(currentLanguage === 'en' ? switchToRussian() : switchToEnglish())
    })
)(Header);
