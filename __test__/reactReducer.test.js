import reducer from 'Src/store/reducer';
import {types} from 'Src/store/actions';

describe('React Reducer', () => {
    let initialState = {};

    beforeEach(() => {
        initialState = {
            countrySelected: {
                label: 'Viet nam',
                id: 'VN',
                slug: 'vietnam'
            },
            isLoading: true,
            countrySummary: {
                totalConfirmed: 100,
                totalDeaths: 100,
                totalRecovered: 100
            },
            rangeDate: {
                fromDate: '04/04/2021',
                toDate: '04/04/2021'
            }
        };
    });

    it('should return the initial state', () => {
        expect(reducer(initialState, {})).toEqual(initialState);
    });

    it('should handle UPDATE_SELECTED_COUNTRY', () => {
        expect(reducer(initialState, {type: types.UPDATE_SELECTED_COUNTRY})).toEqual({
            ...initialState,
            countrySelected: {
                label: 'Viet nam',
                id: 'VN',
                slug: 'vietnam'
            }
        });
    });

    it('should handle UPDATE_COUNTRY_SUMMARY', () => {
        expect(reducer(initialState, {type: types.UPDATE_COUNTRY_SUMMARY})).toEqual({
            ...initialState,
            countrySummary: {
                totalConfirmed: 100,
                totalDeaths: 100,
                totalRecovered: 100
            }
        });
    });

    it('should handle UPDATE_RANGE_DATE', () => {
        expect(reducer(initialState, {type: types.UPDATE_RANGE_DATE})).toEqual({
            ...initialState,
            rangeDate: {
                fromDate: '04/04/2021',
                toDate: '04/04/2021'
            }
        });
    });

    it('should handle UPDATE_LOADING', () => {
        expect(reducer(initialState, {type: types.UPDATE_LOADING})).toEqual({
            ...initialState,
            isLoading: true
        });
    });
});
