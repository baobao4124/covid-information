import {types} from './actions';
import produce from 'immer';

export const initialState = {
    countrySelected: {
        label: 'Viet nam',
        id: 'VN',
        slug: 'vietnam'
    }
};

const defaultMainReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.UPDATE_SELECTED_COUNTRY:
            if (action.payload && action.payload.countrySelected) {
                return {...state, countrySelected: action.payload.lang};
            }
            return state;
        default:
            return state;
    }
};

export default defaultMainReducer;