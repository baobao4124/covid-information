const types = {
    UPDATE_SELECTED_COUNTRY: 'UPDATE_SELECTED_COUNTRY',
    UPDATE_LOADING: 'UPDATE_LOADING',
    UPDATE_COUNTRY_SUMMARY: 'UPDATE_COUNTRY_SUMMARY'
};

const updateSelectedCountry = (dispatch , payload) => {
    dispatch({
        type: types.UPDATE_SELECTED_COUNTRY,
        payload
    });
};

const updateCountrySummary = (dispatch , payload) => {
    dispatch({
        type: types.UPDATE_COUNTRY_SUMMARY,
        payload
    });
};

export {
    types,
    updateSelectedCountry,
    updateCountrySummary
};