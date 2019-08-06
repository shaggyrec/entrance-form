import assert from 'assert';
import { assertPhoneIsValid, assertEmailIsValid , formatPhone } from '../src/functions';

describe('functions', (): void => {
    describe('assertEmailIsValid', (): void => {
        it('should do nothing when email is valid', (): void => {
            assert.doesNotThrow((): void => assertEmailIsValid('valid@email.com', 'en'));
        });

        it('should throw the exception when email is invalid', (): void => {
            assert.throws((): void => assertEmailIsValid('invalid-email', 'en'))
        });
    });

    describe('assertPhoneIsValid', (): void => {
        it('should do nothing when phone is valid', (): void => {
            assert.doesNotThrow((): void => assertPhoneIsValid('+79951999195', 'en'));
        });

        it('should throw the exception when phone is invalid', (): void => {
            assert.throws((): void => assertPhoneIsValid('4341321', 'en'))
        });
    });

    describe('formatPhone', (): void => {
        it('should returns formatted phone without letters', (): void => {
            assert.strictEqual(
                formatPhone('dsad95dddd1999d-19o5'),
                '+7 (995) 199-91-95'
            );
        });
    });
});
