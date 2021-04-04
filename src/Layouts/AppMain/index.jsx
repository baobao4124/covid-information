import React, {useState, useEffect} from 'react';
import produce from 'immer';
import {MessageBox, Calendar} from '@antscorp/components';

// Components
import SearchDropdown from 'Components/SearchDropdown';
import Loading from 'Components/Loading';
import Summary from 'Layouts/AppMain/components/Summary';
import TableVirtualized from 'Layouts/AppMain/components/TableVirtualized';

// Actions
import {StoreContext, StoreReducer, defaultState} from 'Src/store';
import {updateSelectedCountry, updateRangeDate} from 'Src/store/actions';

// Services
import {countryServices, getDayOneByCountryServices} from 'Src/services/index';

// Utils
import useImmerReducer from 'Src/hooks/useImmerReducer';
import {getObjectPropSafely, formatDateTime} from 'Src/utils';
import {handleError} from 'Src/handleError';

const PATH = 'Layouts/AppMain';

const headerStyle = {justifyContent: 'flex-start'};
const bodyStyle = {backgroundColor: '#f8f9fa'};
const loadingStyle = {
    backgroundColor: 'rgba(0,0,0,0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
};
const loadingIconStyle = {
    position: 'absolute',
    marginTop: '-60px'
};

const AppMain = () => {
    const [state, dispatch] = useImmerReducer(StoreReducer, defaultState);

    const [dataByCountry, setDataByCountry] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [messageBox, setMessageBox] = useState({
        isOpen: false,
        content: '',
        title: '',
        isConfirm: false
    });

    const onClickSelectDropdown = (param) => {
        try {
            if (getObjectPropSafely(() => param)) {
                const formatParams = {
                    label: param.Country,
                    id: param.ISO2,
                    slug: param.Slug
                };

                updateSelectedCountry(dispatch, {
                    countrySelected: formatParams
                });
            }
        } catch (error) {
            handleError(error, {
                component: PATH,
                action: 'onClickSelectDropdown',
                args: {}
            });
        }
    };

    useEffect(() => {
        try {
            const {fromDate = '', toDate = ''} = state.rangeDate;

            if (getObjectPropSafely(() => !dataByCountry[state.countrySelected.slug]) || 
                getObjectPropSafely(() => fromDate) || getObjectPropSafely(() => toDate)) {
                setIsLoading(true);

                getDayOneByCountryServices({
                    country: state.countrySelected.slug,
                    from: fromDate,
                    to: toDate
                }).then(response => {
                    const {data} = response;
            
                    if (getObjectPropSafely(() => data.length)) {
                        const newData = data.map((item) => {
                            return {
                                Country: item.Country,
                                Confirmed: item.Confirmed,
                                Recovered: item.Recovered,
                                Deaths: item.Deaths,
                                Date: formatDateTime(item.Date, 'YEAR_MONTH_DAY')
                            };
                        });
        
                        checkOverHeap(20, newData);
                    }

                    setIsLoading(false);
                }).catch(err => {
                    if (err) {
                        setMessageBox({
                            ...messageBox,
                            isOpen: true,
                            title: 'Error',
                            content: 'For performance reasons, please specify a province or a date range up to a week'
                        });
    
                        setIsLoading(false);
                    }
                });
            }
        } catch (error) {
            handleError(error, {
                component: PATH,
                action: 'useEffect -> fetchData',
                args: {}
            });
        }
    }, [getObjectPropSafely(() => state.countrySelected), getObjectPropSafely(() => state.rangeDate)]);

    const checkOverHeap = (limit, newData) => {
        if (getObjectPropSafely(() => Object.keys(dataByCountry).length > limit - 1) || 
        getObjectPropSafely(() => dataByCountry[state.countrySelected.slug])) {
            setDataByCountry(
                produce(dataByCountry, draftData => {
                    delete draftData[Object.keys(dataByCountry)[0]];

                    draftData[state.countrySelected.slug] = newData;
                })
            );
        } else {
            if (getObjectPropSafely(() => state.rangeDate.fromDate) ||
            getObjectPropSafely(() => state.rangeDate.toDate)) {
                updateRangeDate(dispatch, {
                    rangeDate: {
                        fromDate: '',
                        toDate: ''
                    }
                });
            }

            setDataByCountry({
                ...dataByCountry,
                [state.countrySelected.slug]: newData
            });
        }
    };

    const onCloseMessageBox = () => {
        setMessageBox({
            ...messageBox,
            isOpen: false
        });
    };

    const onApplyCalendar = (newProps) => {
        try {
            if (newProps.rangeDate) {
                const pattern = 'TIME_ZONE';
                const rangeDate = {
                    fromDate: formatDateTime(newProps.rangeDate.fromDate, pattern),
                    toDate: formatDateTime(newProps.rangeDate.toDate, pattern)
                };

                updateRangeDate(dispatch, {rangeDate});
            }
        } catch (error) {
            handleError(error, {
                component: PATH,
                action: 'onApplyCalendar',
                args: {newProps}
            });
        }
    };

    return (
        <StoreContext.Provider value={{state, dispatch}}>
            <MessageBox 
                {...messageBox}
                headerStyle={headerStyle}
                bodyStyle={bodyStyle}
                onClose={onCloseMessageBox}
            >
                {messageBox.content}
            </MessageBox>
            {isLoading && <Loading loading={loadingStyle} loadingIcon={loadingIconStyle} />}
            <div className="app-main">
                <div className="app-main__outer">
                    <div className="app-main__inner">
                        <Summary />
                        <div className="app-main__search">
                            <SearchDropdown 
                                style={{width: '300px', minWidth: '200px'}}
                                setStyleScroll={{maxHeight: '150px'}}
                                disableSearch={false}
                                placeholder='Service name'
                                service={countryServices}
                                default={state.countrySelected}
                                configs={{
                                    label: 'Country',
                                    id: 'ISO2',
                                    input_placeholder: 'Search country'
                                }}
                                modeSearch='CLIENT'
                                onClick={onClickSelectDropdown}
                            />
                            <Calendar
                                showCompareSwitch={false}
                                onApply={onApplyCalendar} 
                            />
                        </div>
                        <div className="app-main__table">
                            <TableVirtualized 
                                rows={dataByCountry[state.countrySelected.slug]}
                                isShowFooter={false}
                            />
                        </div>
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
                    </div>
                </div>
            </div>
        </StoreContext.Provider>
    );
};

export default AppMain;