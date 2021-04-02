export const types = {
    UPDATE_SELECTED_COUNTRY: 'Layouts/AppMain/UPDATE_SELECT_COUNTRY'
};

/* Action creator */
export const updateSelectedCountry = (payload) => ({
    type: types.UPDATE_SELECTED_COUNTRY, payload
});