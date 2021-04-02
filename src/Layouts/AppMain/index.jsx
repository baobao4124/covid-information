import React, {useState, useEffect} from 'react';
import produce from 'immer';
import {MessageBox} from '@antscorp/components';

// Components
import SearchDropdown from 'Components/SearchDropdown';
// import PageTitle from 'Layouts/AppMain/components/PageTitle';
import Summary from 'Layouts/AppMain/components/Summary';
import TableVirtualized from 'Layouts/AppMain/components/TableVirtualized';

// Actions
import {StoreContext, StoreReducer, defaultState, types} from 'Src/store/index';

// Services
import {countryServices, getDayOneByCountryServices} from 'Src/services/index';

// Utils
import useImmerReducer from 'Src/hooks/useImmerReducer';
import {getObjectPropSafely} from 'Src/utils';
import {handleError} from 'Src/handleError';

const PATH = 'Layouts/AppMain';

const headerStyle = {justifyContent: 'flex-start'};
const bodyStyle = {backgroundColor: '#f8f9fa'};

const AppMain = () => {
    const [state, dispatch] = useImmerReducer(StoreReducer, defaultState);

    const [dataByCountry, setDataByCountry] = useState({});
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

                dispatch({
                    type: types.UPDATE_SELECTED_COUNTRY,
                    payload: {
                        countrySelected: formatParams
                    }
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
            if (!dataByCountry[state.countrySelected.slug]) {
                getDayOneByCountryServices({
                    country: state.countrySelected.slug
                }).then(response => {
                    const {data} = response;
        
                    if (getObjectPropSafely(() => data.length)) {
                        const newData = data.map((item) => {
                            return {
                                Country: item.Country,
                                Confirmed: item.Confirmed,
                                Recovered: item.Recovered,
                                Deaths: item.Deaths,
                                Date: item.Date
                            };
                        });
    
                        checkOverHeap(20, newData);
                    }
                }).catch(err => {
                    if (err) {
                        setMessageBox({
                            ...messageBox,
                            isOpen: true,
                            title: 'Error',
                            content: 'For performance reasons, please specify a province or a date range up to a week'
                        });
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
    }, [state.countrySelected]);

    const checkOverHeap = (limit, newData) => {
        if (getObjectPropSafely(() => Object.keys(dataByCountry).length > limit - 1)) {
            setDataByCountry(
                produce(dataByCountry, draftData => {
                    delete draftData[Object.keys(dataByCountry)[0]];

                    draftData[state.countrySelected.slug] = newData;
                })
            );
        } else {
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
                        {/* <PageTitle /> */}
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
                        </div>
                        <div className="app-main__table">
                            <TableVirtualized 
                                rows={dataByCountry[state.countrySelected.slug]}
                                isShowFooter={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </StoreContext.Provider>
    );
};

export default AppMain;