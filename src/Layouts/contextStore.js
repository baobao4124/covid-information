// Libraries
import React, {createContext, useReducer} from 'react';

import {getObjectPropSafely} from 'Src/utils';
import {actions} from './constants';

const initialState = {
    name: '',
    error: {
        audiences: [],
        file: [Error.UPLOAD_BLANK],
        copyPaste: [Error.UPLOAD_BLANK]
    },
    data: {
        preview: [],
        render: [],
        popup: {}
    },
    message: ''
};

const layoutContext = createContext(initialState);
const {Provider} = layoutContext;

const StateProvider = ({children}) => {
    const [state, dispatch] = useReducer((state, action) => {
        const payload = getObjectPropSafely(() => action.payload || {});

        switch (action.type) {
            case actions.UPDATE_NAME: {
                const newState = {
                    ...state,
                    ...payload
                };

                return {...newState};
            }
            default:
                throw new Error();
        }
    }, initialState);

    return <Provider value={{state, dispatch}}>{children}</Provider>;

};

export {initialState, layoutContext, StateProvider};