import { createAction, handleActions } from 'redux-actions';

export const SET_FIELD = 'entrance/SET_FIELD';
export const CHECK_EMAIL = 'entrance/CHECK_EMAIl';
export const SET_REGISTERED = 'entrance/SET_REGISTERED';
export const SUBMIT = 'entrance/SUBMIT';
export const INVALID_FIELD = 'entrance/INVALID_FIELD';
export const VALID_FIELD = 'entrance/VALID_FIELD';
export const LOGIN = 'entrance/LOGIN';
export const REGISTER = 'entrance/REGISTER';
export const FAUILURE = 'entrance/FAUILURE';

export const initialState = {
    fields: {
        email: { value: null, error: null },
        password: { value: null, error: null },
        name: { value: null, error: null },
        lastname: { value: null, error: null },
        phone: { value: null, error: null },
        image: { value: null, error: null }
    },
    isRegistered: null,
    loading: false,
    error: null,
};

const field = (entrance: any, name: string): { value: string; error: string }  => entrance.fields[name];

export default handleActions({
    [SET_FIELD]: (state, { payload: { name, value } }): object => ({ ...state, fields: { ...state.fields, [name]: { ...field(state, name), value } } }),
    [INVALID_FIELD]: (state, { payload: { name, message } }): object => ({ ...state, fields: { ...state.fields, [name]: { ...field(state, name), error: message } } }),
    [VALID_FIELD]: (state, { payload }): object => ({ ...state, fields: { ...state.fields, [payload]: { ...field(state, payload), error: null } } }),
    [CHECK_EMAIL]: (state): object => ({ ...state, loading: true }),
    [SUBMIT]: (state): object => ({ ...state, loading: true }),
    [SET_REGISTERED]: (state, action): object => ({ ...state, loading: false, isRegistered: action.payload }),
    [FAUILURE]: (state, action): object => ({ ...state, loading: false, error: action.payload }),
}, initialState);

export const setField = createAction(SET_FIELD, (name: string, value: string): object => ({ name, value }));
export const setFieldInvalid = createAction(INVALID_FIELD, (name: string, message: string): object => ({ name, message }));
export const setFieldValid = createAction(VALID_FIELD, (name: string): string => name);
export const checkEmail = createAction(CHECK_EMAIL, (): void => {});
export const setRegistered = createAction(SET_REGISTERED, (value: boolean): boolean => value);
export const login = createAction(LOGIN, (): void => {});
export const register = createAction(REGISTER, (): void => {});
export const failure = createAction(FAUILURE, (message: string): string => message);

export const fields = (state): object=> state.entrance.fields;
export const fieldValue = (state, fieldName): string => state.entrance.fields[fieldName].value;
export const isFormValid = (state): boolean => !Object.keys(state.entrance.fields)
    .filter((fieldName: string): string | boolean => {
        const { value, error } = field(state.entrance, fieldName);
        return fieldName !== 'image' && (!value || error);
    }).length;

