import React, {useState, useReducer, useContext, useEffect} from 'react';
import produce from 'immer';

// Components
import SearchDropdown from 'Components/SearchDropdown';
// import PageTitle from 'Layouts/AppMain/components/PageTitle';
import Summary from 'Layouts/AppMain/components/Summary';
import Table from 'Layouts/AppMain/components/Table';

// Actions
import {layoutContext} from 'Layouts/contextStore';
import defaultMainReducer, {initialState} from './reducer';
import {types} from './actions';

// Utils
import {countryServices, getDayOneByCountryServices} from 'Src/services/index';
import {getObjectPropSafely} from 'Src/utils';

const AppMain = () => {
    const {state: store, dispatch} = useContext(layoutContext);
    const {state, useDispatch} = useReducer(defaultMainReducer, initialState);

    const [selectCountry, setSelectCountry] = useState(initialState.countrySelected);
    const [dataByCountry, setDataByCountry] = useState({});

    const onClick = (param) => {
        if (getObjectPropSafely(() => param)) {
            const formatParams = {
                label: param.Country,
                id: param.ISO2,
                slug: param.Slug
            };
    
            setSelectCountry(formatParams);
    
            // useDispatch({
            //     type: types.UPDATE_SELECTED_COUNTRY,
            //     countrySelected: formatParams
            // });
        }
    };

    useEffect(() => {
        if (!dataByCountry[selectCountry.slug]) {
            getDayOneByCountryServices({
                country: selectCountry.slug
            }).then(response => {
                const {data} = response;
    
                if (getObjectPropSafely(() => data.length)) {
                    const newData = data.map((item) => {
                        return {
                            ID: item.ID,
                            Country: item.Country,
                            Confirmed: item.Confirmed,
                            Recovered: item.Recovered,
                            Deaths: item.Deaths,
                            Date: item.Date
                        };
                    });
    
                    setDataByCountry({
                        ...dataByCountry,
                        [selectCountry.slug]: newData
                    });
                }
            });
        }
    }, [selectCountry]);

    return (
        <div className="app-main">
            <div className="app-main__outer">
                <div className="app-main__inner">
                    {/* <PageTitle /> */}
                    <Summary />
                    <div className="app-main__search">
                        <SearchDropdown 
                            style={{width: '300px', minWidth: '200px'}}
                            setStyleScroll={{maxHeight: '150px'}}
                            disableSearch={false}
                            placeholder='Service name'
                            service={countryServices}
                            default={selectCountry}
                            configs={{
                                label: 'Country',
                                id: 'ISO2',
                                input_placeholder: 'Search country'
                            }}
                            modeSearch='CLIENT'
                            onClick={onClick}
                        />
                    </div>
                    <div className="app-main__table">
                        <Table data={dataByCountry[selectCountry.slug]} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppMain;