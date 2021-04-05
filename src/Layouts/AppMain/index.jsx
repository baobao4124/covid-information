import React, {useState, useEffect} from 'react';
import produce from 'immer';
import {MessageBox, Calendar} from '@antscorp/components';

// Components
import SearchDropdown from 'Components/SearchDropdown';
import Loading from 'Components/Loading';
import Summary from 'Layouts/AppMain/components/Summary';
import SummaryCountry from 'Layouts/AppMain/components/SummaryContry';
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
                            {isLoading && <Loading loading={loadingStyle} loadingIcon={loadingIconStyle} />}
                            <TableVirtualized 
                                rows={dataByCountry[state.countrySelected.slug]}
                                isShowFooter={false}
                            />
                        </div>
                        <SummaryCountry />
                    </div>
                </div>
            </div>
        </StoreContext.Provider>
    );
};

export default AppMain;