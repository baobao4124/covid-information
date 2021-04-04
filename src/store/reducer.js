// Utils
import {initialState} from './state';
import {types} from './actions';

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.UPDATE_SELECTED_COUNTRY:
            if (action.payload && action.payload.countrySelected) {
                return {...state, countrySelected: action.payload.countrySelected};
            }
            return state;
        case types.UPDATE_COUNTRY_SUMMARY:
            if (action.payload && action.payload.countrySummary) {
                return {...state, countrySummary: action.payload.countrySummary};
            }
            return state;
        case types.UPDATE_RANGE_DATE:
            if (action.payload && action.payload.rangeDate) {
                return {...state, rangeDate: action.payload.rangeDate};
            }
            return state;
        case types.UPDATE_LOADING:
            if (action.payload) {
                return {...state, isLoading: action.payload};
            }
            return state;
        default:
            return state;
    }
};

export default reducer;