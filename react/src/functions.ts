import InvalidFormValue from './errors/InvalidFormValue';
import localize from './l18n';
import { INVALID_EMAIL, INVALID_PHONE, REQUIRED_FIELD_ERROR } from './l18n/messages';

export const currentScript = (): Node => (
    document.currentScript || ((): Node => {
        const scripts = document.getElementsByTagName('script');
        return scripts[scripts.length - 1];
    })()
);

export const assertEmailIsValid = (email: string, lang: string): void => {
    if(!/[^@\s]+@[^@\s]+\.[^@\s]+/.test(email)) {
        throw new InvalidFormValue(localize(INVALID_EMAIL, lang));
    }
};

export const assertRequiredFieldIsNotEmpty = (value: string, lang: string): void => {
    if(value + '' === '') {
        throw new InvalidFormValue(localize(REQUIRED_FIELD_ERROR, lang));
    }
};

export const formatPhone = (phone: string): string => {
    const phoneStartsFrom = '+7 (9';

    if(phone.length === 1 && (phone === '9' || phone === '8' || phone === '7' || phone === '+')) {
        return phoneStartsFrom;
    }

    if(phone.indexOf(phoneStartsFrom) === 0){
        phone = phone.replace(phoneStartsFrom,'')
    }
    phone = phone.replace(/\D/g,'');
    phone = phone.substring(0,9);
    const size = phone.length;

    if(size === 0) {
        return phoneStartsFrom;
    }

    if(size > 0 && size < 3){
    }else if(size > 2 && size < 6){
        phone = phone.substring(0,2)+') '+phone.substring(2,5);
    }else if(size < 8){
        phone = phone.substring(0,2)+') '+phone.substring(2,5)+'-'+phone.substring(5,7);
    }else{
        phone = phone.substring(0,2)+') '+phone.substring(2,5)+'-'+phone.substring(5,7) +'-'+phone.substring(7,9);
    }

    return phoneStartsFrom + phone;
};

export const assertPhoneIsValid = (phone, lang): void => {
    if (phone.replace(/\D/g,'').length !== 11) {
        throw new InvalidFormValue(localize(INVALID_PHONE, lang));
    }
};

export const fileToBase64 = (file: File): Promise<string|ArrayBuffer> => new Promise((resolve, reject): void => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (): void => resolve(reader.result);
    reader.onerror = (error): void => reject(error);
});

