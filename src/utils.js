import {handleError} from 'Src/handleError';

const PATH = 'Src/utils.js';

/***
 * Get a property of object safely
 * @param fn: function that gets object property
 * @param defaultValue: default value if something wrong
 * @example
 *  getSafe(() => a.b.c.d, 'someValue') => d
 *  getSafe(() => a.b[undefined].c.d, 'someValue') => 'someValue'
 * @returns {string|*}
 */
export const getObjectPropSafely = (fn, defaultValue = '') => {
    try {
        return fn();
    } catch (e) {
        return defaultValue;
    }
};

export function formatNumber(value) {
    try {
        let formattedValue = 0;

        if (value) {
            formattedValue = Intl.NumberFormat('en').format(value);
        }

        return formattedValue;
    } catch (error) {
        handleError(error, {
            path: PATH,
            name: 'formatNumber',
            args: {
                value
            }
        });
    }
}

export const setCookie = (name, value, exdays, domain) => {
    try {
        const {protocol = 'https:'} = getObjectPropSafely(() => window.location) || {};

        let d = new Date();

        d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);

        if (protocol === 'https:') {
            document.cookie = `${name}=${value}; Domain=${domain}; Path=/; Expires=${d.toGMTString()}; SameSite=None; Secure`;
        } else {
            document.cookie = `${name}=${value}; Domain=${domain}; Path=/; Expires=${d.toGMTString()};`;
        }

    } catch (error) {
        handleError(error, {
            path: PATH,
            name: 'setCookie',
            args: {
                name, value, exdays, domain
            }
        });
    }
};

export const getCookie = (cname) => {
    try {
        let name = cname + '=';
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');

        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];

            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }

            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }

        return '';
    } catch (error) {
        handleError(error, {
            path: PATH,
            name: 'getCookie',
            args: {
                cname
            }
        });
    }
};

export const random = (number) => {
    try {
        let text = '';
        let possible = 'abcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < number; i++) {text += possible.charAt(Math.floor(Math.random() * possible.length))}

        return text;
    } catch (error) {
        handleError(error, {
            path: PATH,
            name: 'random',
            args: {
                number
            }
        });
    }
};