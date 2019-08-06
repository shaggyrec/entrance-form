import { createAction, handleActions } from 'redux-actions';
import Language from '../dataTypes/Language';

const SWITCH_TO_RUSSIAN = 'application/SWITCH_TO_RUSSIAN';
const SWITCH_TO_ENGLISH = 'application/SWITCH_TO_ENGLISH';
const SET_TOKEN = 'application/SET_TOKEN';



export interface ApplicationState {
    language: Language;
    authToken: string;
}

export const initialState: ApplicationState = {
    language: Language.Ru,
    authToken: null
};

export default handleActions({
    [SWITCH_TO_RUSSIAN]: (state: any): object => ({ ...state, language: Language.Ru }),
    [SWITCH_TO_ENGLISH]: (state: any): object => ({ ...state, language: Language.En }),
    [SET_TOKEN]: (state: any, action: any): object => ({ ...state, authToken: action.payload })

}, initialState);

export const switchToRussian: any = createAction(SWITCH_TO_RUSSIAN, (): void => {});
export const switchToEnglish: any = createAction(SWITCH_TO_ENGLISH, (): void => {});
export const setToken: any = createAction(SET_TOKEN, (token: string): string => token);

export const language = (state): Language => state.application.language;
export const authToken = (state): string => state.application.authToken;
