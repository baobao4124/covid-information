// Library
import moment from 'moment';

// Utils
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

export const formatDateTime = (value, pattern, locale = 'en') => {
    let formatDefault = ['YYYYMMDD hh:mm:ss','YYYYMMDDhhmm', 'YYYYMMDDhhmmss', 'YYYYMMDD', 'DD/MM/YYYY'];
    let formattedValue = value;

    try {
        if (typeof pattern !== 'undefined') {
            switch (pattern) {
                case 'TIME_ZONE': {
                    formattedValue = moment(value, ['YYYY-MM-DD[T]HH:mm:ss.SSS[Z]',...formatDefault], 'en').locale(locale).format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
                    break;
                }
                case 'YEAR': {
                    formattedValue = moment(value, ['YYYY',...formatDefault], 'en').locale(locale).format('YYYY');
                    break;
                }
                case 'YEAR_QUARTER': {
                    formattedValue = moment(value, ['YYYYQ',...formatDefault], 'en').locale(locale).format('[Q]Q, YYYY');
                    break;
                }
                case 'YEAR_MONTH': {
                    formattedValue = moment(value, ['YYYYMM',...formatDefault], 'en').locale(locale).format('MMM YYYY');
                    break;
                }
                case 'YEAR_WEEK': {
                    let fromDate = moment(value, ['YYYYWW', 'YYYYMM', ...formatDefault], 'en').startOf('isoWeek').locale(locale).format('MMM DD, YYYY');
                    let toDate = moment(value, ['YYYYWW', 'YYYYMM',...formatDefault], 'en').endOf('isoWeek').locale(locale).format('MMM DD, YYYY');
                    let week = moment(value, ['YYYYWW', 'YYYYMM',...formatDefault], 'en').locale(locale).format('[Week] WW');

                    formattedValue = `${fromDate} to ${toDate} (${week})`;
                    break;
                }
                case 'DATE':
                case 'YEAR_MONTH_DAY': {
                    formattedValue = moment(value, [...formatDefault], 'en').locale(locale).format('MMM DD, YYYY');
                    break;
                }
                case 'YEAR_MONTH_DAY_HOUR': {
                    formattedValue = moment(value, ['YYYYMMDDHH',...formatDefault], 'en').locale(locale).format('MMM, DD, YYYY, hh A');
                    break;
                }
                case 'YEAR_MONTH_DAY_MINUTE': {
                    formattedValue = moment(value, ['YYYYMMDDHHmm',...formatDefault], 'en').locale(locale).format('MMM, DD, YYYY, hh:mm A');
                    break;
                }
                case 'YEAR_MONTH_DAY_SECOND': {
                    formattedValue = moment(value, ['YYYYMMDDHHmmss',...formatDefault], 'en').locale(locale).format('MMM, DD, YYYY, hh:mm:ss A');
                    break;
                }
                case 'QUARTER': {
                    formattedValue = moment(value, ['Q',...formatDefault], 'en').locale(locale).format('[Q]Q');
                    break;
                }
                case 'MONTH': {
                    formattedValue = moment(value, ['MM',...formatDefault], 'en').locale(locale).format('MMM');
                    break;
                }
                case 'WEEK': {
                    formattedValue = moment(value, ['WW', 'ww', ...formatDefault], 'en').locale(locale).format('[Week] WW');
                    break;
                }
                case 'DAY_OF_WEEK': {
                    formattedValue = moment(value, ['d',...formatDefault], 'en').locale(locale).format('dddd');
                    break;
                }
                case 'MONTH_DAY': {
                    formattedValue = moment(value, ['MMDD',...formatDefault], 'en').locale(locale).format('MMM DD');
                    break;
                }
                case 'DAY_OF_MONTH':
                case 'DAY': {
                    // Add month for moment know 31 is 31, if not 31 -> 01
                    formattedValue = moment(value + '01', ['DD',...formatDefault], 'en').locale(locale).format('DD');
                    break;
                }
                case 'HOUR': {
                    formattedValue = moment(value, ['HH',...formatDefault], 'en').locale(locale).format('hh A');
                    break;
                }
                case 'MINUTE': {
                    formattedValue = moment(value, ['mm',...formatDefault], 'en').locale(locale).format('mm');
                    break;
                }
                default:
                    formattedValue = value;
                    break;
            }
        }
    } catch (e) {
        return value;
    }

    if (formattedValue === 'Invalid date') {
        return value;
    }

    return formattedValue;
};