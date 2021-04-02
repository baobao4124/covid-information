import React, {useEffect, useState} from 'react';

// Services
import {summaryServices} from 'Src/services/index';

// Utils
import {handleError} from 'Src/handleError';
import {getObjectPropSafely, formatNumber} from 'Src/utils';

const PATH = 'Layouts/AppMain/components/Summary/index.jsx';

const Summary = () => {
    const [state, setState] = useState({
        totalConfirmed: 0,
        totalDeaths: 0,
        totalRecovered: 0
    });

    useEffect(() => {
        try {
            summaryServices().then(response => {
                const {Global: global} = response.data;

                if (getObjectPropSafely(() => global)) {
                    const newState = {
                        totalConfirmed: formatNumber(global.TotalConfirmed),
                        totalDeaths: formatNumber(global.TotalDeaths),
                        totalRecovered: formatNumber(global.TotalRecovered)
                    };

                    setState(newState);
                }
            });
        } catch (error) {
            handleError(error, {
                component: PATH,
                action: 'useEffect -> fetchData',
                args: {}
            });
        }
    }, []);
    
    return (
        <>
            <div className="row">
                <div className="col-md-6 col-xl-4">
                    <div className="card mb-3 widget-content bg-midnight-bloom">
                        <div className="widget-content-wrapper text-white">
                            <div className="widget-content-left">
                                <div className="widget-heading">Total Confirmed</div>
                                <div className="widget-subheading" />
                            </div>
                            <div className="widget-content-right">
                                <div className="widget-numbers text-white"><span>{state.totalConfirmed}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-xl-4">
                    <div className="card mb-3 widget-content bg-arielle-smile">
                        <div className="widget-content-wrapper text-white">
                            <div className="widget-content-left">
                                <div className="widget-heading">Total Deaths</div>
                                <div className="widget-subheading" />
                            </div>
                            <div className="widget-content-right">
                                <div className="widget-numbers text-white"><span>{state.totalDeaths}</span></div>
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
                                <div className="widget-numbers text-white"><span>{state.totalRecovered}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Summary;