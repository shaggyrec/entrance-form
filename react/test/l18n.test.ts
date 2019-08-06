import assert from 'assert';
import localize from '../src/l18n';
import { NAME } from '../src/l18n/messages'


describe('l18n', (): void => {
    it('should return empty string when message not found', (): void => {
        assert.strictEqual(localize('unknown_message', 'ru'), '')
    });

    it('should return ru localisation', (): void => {
        assert.strictEqual(localize(NAME, 'ru'), 'Имя')
    });

    it('should return en localisation', (): void => {
        assert.strictEqual(localize(NAME, 'en'), 'Your name')
    });
});
