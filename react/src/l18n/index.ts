import * as Message from './messages';

const messages = {
    [Message.EMAIL_FORM_INPUT]: {
        en: 'Enter your Email',
        ru: 'Введите ваш Email'
    },
    [Message.NEXT_STEP]: {
        en: 'Next',
        ru: 'Далее'
    },
    [Message.SWITCH_LANGUAGE]: {
        ru: 'Switch to english',
        en: 'Переключить на русский'
    },
    [Message.EMAIL_FORM_INPUT_HINT]: {
        ru: 'Если вы еще не зарегистрированы на следующем шаге вы продолжите регистрацию',
        en: 'If you haven\'t account yet you will continue registration next step'
    },
    [Message.LOGIN_REGISTRATION]: {
        ru: 'Вход/Регистрация',
        en: 'Login/Registration'
    },
    [Message.INVALID_EMAIL]: {
        ru: 'Email должен быть формата name@example.com',
        en: 'Email must be similar name@example.com'
    },
    [Message.REQUIRED_FIELD_ERROR]: {
        ru: 'Поле обязательно для заполнения',
        en: 'The field is required',
    },
    [Message.REGISTRATION]: {
        ru: 'Регистрация',
        en: 'Registration'
    },
    [Message.PASSWORD]: {
        ru: 'Пароль',
        en: 'Password'
    },
    [Message.NEW_PASSWORD_FIELD_HINT]: {
        ru: 'Придумайте пароль',
        en: 'Set a new password'
    },
    [Message.NAME]: {
        ru: 'Имя',
        en: 'Your name'
    },
    [Message.LASTNAME]: {
        ru: 'Фамилия',
        en: 'Your last name'
    },
    [Message.PHONE]: {
        ru: 'Номер телефона',
        en: 'Your phone number'
    },
    [Message.REQURED_FIELDS]: {
        ru: 'Обзятельные для заполнения поля',
        en: 'Required fields'
    },
    [Message.INVALID_PHONE]: {
        ru: 'Номер телефона должен быть в формате +7 (911) 222 - 22 - 22',
        en: 'Phone number must has format +7 (911) 222 - 22 - 22',
    },
    [Message.LOGIN]: {
        ru: 'Вход',
        en: 'Login'
    },
    [Message.PROFILE]: {
        ru: 'Профиль',
        en: 'Profile'
    },
    [Message.LOGOUT]: {
        ru: 'Выйти',
        en: 'Logout'
    },
    [Message.INVALID_PASSWORD]: {
        ru: 'Неправильный пароль. Попробуйте ещё раз.',
        en: 'Invalid password. Try again'
    },
    [Message.IMAGE]: {
        ru: 'Изображение',
        en: 'Image'
    },
    [Message.NEW_IMAGE_FIELD_HINT]: {
        ru: 'Перетащите сюда изображение или нажмите кнопку, чтобы выбрать',
        en: 'Drag and drop your image or push the the button for manually choice'
    },
    [Message.CHOOSE_IMAGE]: {
        ru: 'Выберите изображение с компьютера',
        en: 'Choose image from your computer'
    }
};
const localize = (message: string, language: string): string => messages[message] ? messages[message][language] : '';
export { Message };
export default localize;
