const types = {
    UPDATE_SELECTED_COUNTRY: 'UPDATE_SELECTED_COUNTRY',
    UPDATE_LOADING: 'UPDATE_LOADING',
    UPDATE_COUNTRY_SUMMARY: 'UPDATE_COUNTRY_SUMMARY',
    UPDATE_RANGE_DATE: 'UPDATE_RANGE_DATE'
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

const updateRangeDate = (dispatch , payload) => {
    dispatch({
        type: types.UPDATE_RANGE_DATE,
        payload
    });
};

export {
    types,
    updateSelectedCountry,
    updateCountrySummary,
    updateRangeDate
};