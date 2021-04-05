import React, {useContext} from 'react';

// Actions
import {StoreContext} from 'Src/store';

// Utils
import {getObjectPropSafely} from 'Src/utils';

const SummaryCountry = () => {
    const  {state} = useContext(StoreContext);
  
    return (
        <div className="app-main__footer">
            <div className="row">
                <div className="col-md-6 col-xl-4">
                    <div className="card mb-3 widget-content">
                        <div className="widget-content-outer">
                            <div className="widget-content-wrapper">
                                <div className="widget-content-left">
                                    <div className="widget-heading">Confirmed</div>
                                </div>
                                <div className="widget-content-right">
                                    <div className="widget-numbers text-warning">{getObjectPropSafely(() => state.countrySummary.totalConfirmed || 0)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-xl-4">
                    <div className="card mb-3 widget-content">
                        <div className="widget-content-outer">
                            <div className="widget-content-wrapper">
                                <div className="widget-content-left">
                                    <div className="widget-heading">Deaths</div>
                                </div>
                                <div className="widget-content-right">
                                    <div className="widget-numbers text-danger">{getObjectPropSafely(() => state.countrySummary.totalDeaths || 0)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-xl-4">
                    <div className="card mb-3 widget-content">
                        <div className="widget-content-outer">
                            <div className="widget-content-wrapper">
                                <div className="widget-content-left">
                                    <div className="widget-heading">Recovered</div>
                                </div>
                                <div className="widget-content-right">
                                    <div className="widget-numbers text-success">{getObjectPropSafely(() => state.countrySummary.totalRecovered || 0)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SummaryCountry;