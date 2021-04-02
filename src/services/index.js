// Library
import axios from 'axios';

const API_HOST = 'https://api.covid19api.com/';

export function countryServices(params) {
    return services.getList({...params, API_HOST: API_HOST + 'countries'});
}

export function summaryServices(params) {
    return services.getList({...params, API_HOST: API_HOST + 'summary'});
}

export function getDayOneByCountryServices(params) {
    return services.getList({...params, API_HOST: API_HOST + 'country/' + params.country});
}

export const services = {
    get: function get(params) {
        if (typeof params.API_HOST !== 'undefined' && typeof params.id !== 'undefined') {
            const API_HOST = params.API_HOST;
            
            delete params.API_HOST;
            delete params.cancelToken;

            return axios.get(API_HOST + '/' + params.id, {
                params: params
            });
        } else {
            return false;
        }
    },
    getList: function getList(params) {
        if (typeof params.API_HOST !== 'undefined') {
            const API_HOST = params.API_HOST;

            delete params.API_HOST;
            delete params.cancelToken;

            return axios.get(API_HOST, {
                params: params
            });
        } else {
            return false;
        }
    }
};
