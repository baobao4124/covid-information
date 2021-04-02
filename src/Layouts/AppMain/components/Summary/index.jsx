import React, {useContext, useEffect, useState} from 'react';

// Services
import {summaryServices} from 'Src/services/index';

// Actions
import {StoreContext} from 'Src/store';

import {updateCountrySummary} from 'Src/store/actions';

// Utils
// import useImmerReducer from 'Src/hooks/useImmerReducer';
import {handleError} from 'Src/handleError';
import {getObjectPropSafely, formatNumber} from 'Src/utils';

const PATH = 'Layouts/AppMain/components/Summary/index.jsx';

const Summary = () => {
    const  {state: store, dispatch} = useContext(StoreContext);
    const [state, setState] = useState({
        totalConfirmed: 0,
        totalDeaths: 0,
        totalRecovered: 0
    });

    useEffect(() => {
        try {
            summaryServices().then(response => {
                const {Global: global, Countries: countries} = response.data;

                if (getObjectPropSafely(() => global)) {
                    const newState = {
                        totalConfirmed: formatNumber(global.TotalConfirmed),
                        totalDeaths: formatNumber(global.TotalDeaths),
                        totalRecovered: formatNumber(global.TotalRecovered)
                    };

                    setState(newState);
                }

                if (getObjectPropSafely(() => countries.length)) {
                    const country = countries.find(country => country.Slug === store.countrySelected.slug);

                    if (country) {
                        const countrySummary = {
                            totalConfirmed: formatNumber(country.TotalConfirmed),
                            totalDeaths: formatNumber(country.TotalDeaths),
                            totalRecovered: formatNumber(country.TotalRecovered)
                        };
                        
                        updateCountrySummary(dispatch, {
                            countrySummary
                        });
                    }
                }
            });
        } catch (error) {
            handleError(error, {
                component: PATH,
                action: 'useEffect -> fetchData',
                args: {}
            });
        }
    }, [getObjectPropSafely(() => store.countrySelected)]);
    
    return (
        <>
            <div className="row">
                <div className="col-md-6 col-xl-4">
                    <div className="card mb-3 widget-content bg-arielle-smile">
                        <div className="widget-content-wrapper text-white">
                            <div className="widget-content-left">
                                <div className="widget-heading">Total Confirmed</div>
                                <div className="widget-subheading" />
                            </div>
                            <div className="widget-content-right">
                                <div className="widget-numbers text-white"><span>{getObjectPropSafely(() => state.totalConfirmed || 0)}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-xl-4">
                    <div className="card mb-3 widget-content bg-strong-bliss">
                        <div className="widget-content-wrapper text-white">
                            <div className="widget-content-left">
                                <div className="widget-heading">Total Deaths</div>
                                <div className="widget-subheading" />
                            </div>
                            <div className="widget-content-right">
                                <div className="widget-numbers text-white"><span>{getObjectPropSafely(() => state.totalDeaths || 0)}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-xl-4">
                    <div className="card mb-3 widget-content bg-grow-early">
                        <div className="widget-content-wrapper text-white">
                            <div className="widget-content-left">
                                <div className="widget-heading">Total Recovered</div>
                                <div className="widget-subheading" />
                            </div>
                            <div className="widget-content-right">
                                <div className="widget-numbers text-white"><span>{getObjectPropSafely(() => state.totalRecovered || 0)}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Summary;