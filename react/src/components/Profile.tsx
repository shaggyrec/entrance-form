import React, { Component, ReactNode } from 'react';
import UserSchema from '../dataTypes/UserSchema';
import localize from '../l18n';
import { LASTNAME, NAME, PHONE } from '../l18n/messages';
import Language from '../dataTypes/Language';


interface ProfileInterface extends UserSchema {
    language: Language;
}

class Profile extends Component<ProfileInterface>{
    public render(): ReactNode {
        const { language } = this.props;
        return (
            <div className="row">
                <div className="col-sm-4 mb-4 mb-sm-0">
                    <div
                        className="profile-image"
                        style={this.props.image ? { backgroundImage: `url(/img/${this.props.image})` }: {}}
                    />
                </div>
                <div className="col-sm-8">
                    <ul className="profile-info">
                        <li>Email: <b>{this.props.email}</b></li>
                        <li>{localize(NAME, language)}: <b>{this.props.name}</b></li>
                        <li>{localize(LASTNAME, language)}: <b>{this.props.lastname}</b></li>
                        <li>{localize(PHONE, language)}: <b>{this.props.phone}</b></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Profile;
