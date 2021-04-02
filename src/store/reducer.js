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
        default:
            return state;
    }
};

export default reducer;