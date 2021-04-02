import {types} from './actions';

const initialState = {
    actions: []
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.DO_SOME_THING:
            console.log('Do something');
            return state;
        default:
            return state;
    }
};
