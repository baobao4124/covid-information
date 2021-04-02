// Library
import React, {useEffect, useState, useRef}  from 'react';
import {DropdownMenu, DropdownToggle, UncontrolledDropdown} from 'reactstrap';
import produce from 'immer';
import classnames from 'classnames';

// Components
import Loading from 'Src/components/Loading';

// Utils
import {handleError} from 'Src/handleError';
import usePrevious from 'Src/hooks/usePrevious';
import {getObjectPropSafely} from 'Src/utils';

// Assets
import styles from './styles.module.scss';

const PATH = 'Components/SearchDropdown/index.jsx';

const defaultProps = {
    default: {
        id: 0,
        name: '',
        label: 'Existing Project'
    },
    configs: {
        input_placeholder: '',
        label: 'object_name',
        id: 'object_id',
        data: null
    },
    disabled: false,
    onClick: () => {},
    service: undefined,
    serviceConfig: {
        limit: 20
    },
    dependence: 'service_id',
    listDependence: [],
    style: {},
    modeSearch: 'CLIENT',
    listDisabled: [],
    autoLoad: true,
    setStyleScroll: {},
    addData: [],
    className: ''
};

const SearchDropdown = (props) => {
    const [isOpening, setIsOpening] = useState(false);
    const [isNoData, setIsNoData] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);

    const cancelRequest = useRef(null);
    const container = useRef(null);

    const serviceConfigPrev = usePrevious(props.serviceConfig);
    const searchPrev = usePrevious(search);

    const {disableSearch, className} = props;

    let classNameDefault = className ? className : 'btn-default btn-full dropdown-toggle';

    useEffect(() => {
        setIsLoading(true);
        fetchData(search,page);
    }, []);

    useEffect(() => {
        // if selected value is not in the list
        // reset to placeholder
        if (
            typeof serviceConfigPrev === 'object' &&
                typeof props.serviceConfig === 'object' &&
                serviceConfigPrev[props.dependence] !== props.serviceConfig[props.dependence]
        ) {
            setIsLoading(true);
            setPage(1);
            fetchData({
                page: page,
                search: search
            });
        }

        if (props.listDependence.length && typeof serviceConfigPrev === 'object' && typeof props.serviceConfig === 'object') {
            let checkModifyConfig = false;

            for (let item of props.listDependence) {
                if (serviceConfigPrev[item] !== props.serviceConfig[item]) {
                    checkModifyConfig = true;
                    break;
                }
            }
            if (checkModifyConfig) {
                setIsLoading(true);
                setPage(1);
                fetchData({
                    page: page,
                    search: search
                });
            }
        }

        if (searchPrev !== search) {
            if (props.modeSearch === 'SERVER') {
                setIsLoading(true);
                fetchData({
                    page: 1,
                    search: search
                });
            }
        }
    }, [getObjectPropSafely(() => props.modeSearch), getObjectPropSafely(() => props.listDependence)]);

    const fetchData = configs => {
        const {service, serviceConfig} = props;

        try {
            if (service) {
                service({
                    ...serviceConfig,
                    ...configs,
                    cancelToken: cancelRequest.token
                })
                    .then(response => {
                        const {data} = response;

                        if (data && props.configs.data && data[props.configs.data]) {
                            setItems(
                                produce(items, draftState => {
                                    data[props.configs.data].map(item => {
                                        draftState.items.push(item);
                                    });
                                })
                            );

                            if (page >= Math.ceil(data.length / props.serviceConfig.limit)) {
                                setIsNoData(true);
                            }

                            setIsLoading(false);
                        } else if (data) {
                            setItems(
                                produce(items, draftState => {
                                    data.map(item => {
                                        draftState.push(item);
                                    });
                                })
                            );

                            if (page >= Math.ceil(data.length / props.serviceConfig.limit)) {
                                setIsNoData(true);
                            }

                            setIsLoading(false);
                        } else {
                            setIsLoading(false);
                        }
                    })
                    .catch(err => {
                        setIsLoading(false);
                    });
            }
        } catch (error) {
            handleError(error, {
                path: PATH,
                action: 'fetchData ',
                args: {}
            });
        }
    };

    const toggleDropdown = () => {
        setIsOpening(!isOpening);
        setSearch('');
        setIsNoData(false);
    };

    const onClickItem = item => {
        try {
            const {onClick} = props;

            setIsOpening(!isOpening);
            setSearch('');
            setIsNoData(false);

            onClick(item);
        } catch (error) {
            handleError(error, {
                path: PATH,
                action: 'onClickItem',
                args: {}
            });
        }
    };

    const renderItems = () => {
        try {
            const {configs, modeSearch, listDisabled} = props;

            if (modeSearch === 'CLIENT') {
                return items.length > 0 ? (
                    <React.Fragment>
                        {items.map((item, index) => {
                            let isDisabled = listDisabled.some(e => e[configs.id] === item[configs.id]);
                            let label = typeof item[configs.label] === 'object' ? item[configs.label].title : item[configs.label];

                            if (label && label.toUpperCase().indexOf(search.toUpperCase()) !== -1) {
                                return (
                                    <li
                                        key={index}
                                        onClick={() => {
                                            !isDisabled && onClickItem(item);
                                        }}
                                        style={isDisabled ? {cursor: 'default'} : {}}
                                    >
                                        <span className='name' style={isDisabled ? {color: '#ccc'} : {}}>
                                            {label}
                                        </span>
                                    </li>
                                );
                            }
                        })}
                        {!items.map(item => {
                            let label = typeof item[configs.label] === 'object' ? item[configs.label].title : item[configs.label];

                            return label.toUpperCase().indexOf(search.toUpperCase()) !== -1;
                        }) && <p>No data</p>}
                    </React.Fragment>
                ) : (
                    <li>
                        <span className='name'>No data</span>
                    </li>
                );
            } else {
                return items.length > 0
                    ? items.map((item, index) => {
                        let isDisabled = listDisabled.some(e => e[configs.id] === item[configs.id]);
                        let label = typeof item[configs.label] === 'object' ? item[configs.label].title : item[configs.label];

                        if (label) {
                            return (
                                <li
                                    key={index}
                                    onClick={() => {
                                        !isDisabled && onClickItem(item);
                                    }}
                                    style={isDisabled ? {cursor: 'default'} : {}}
                                >
                                    <span className='name' style={isDisabled ? {color: '#ccc'} : {}}>
                                        {label}
                                    </span>
                                </li>
                            );
                        }
                    })
                    : !isLoading && (
                        <li>
                            <span className='name'>No data</span>
                        </li>
                    );
            }
        } catch (error) {
            handleError(error, {
                path: PATH,
                action: 'renderItems',
                args: {}
            });
        }
    };

    const renderDropdownLabel = () => {
        return props.default.label;
    };

    const scrolled = () => {
        try {
            if (props.autoLoad) {
                const CONTAINER_HEIGHT = container.current.getBoundingClientRect().height;

                if (!isLoading && !isNoData && CONTAINER_HEIGHT + container.current.scrollTop + 5 >= container.current.scrollHeight) {
                    setPage(page + 1);
                    setIsLoading(true);
                    fetchData({
                        page: page,
                        search: search
                    });
                }
            }
        } catch (error) {
            handleError(error, {
                path: PATH,
                action: 'scrolled',
                args: {}
            });
        }
    };

    const onSearch = event => {
        try {
            const {value} = event.target;
            let newState = {
                search: value,
                isLoading: false,
                page: 1
            };

            if (props.modeSearch !== 'CLIENT') {
                setIsNoData(false);
                setItems([]);
            }

            setSearch(newState.search);
            setIsLoading(newState.isLoading);
            setPage(newState.page);
        } catch (error) {
            handleError(error, {
                path: PATH,
                action: 'onSearch',
                args: {}
            });
        }
    };

    return (
        <div className='container-field d-inline-block' style={props.style}>
            <UncontrolledDropdown className={'dropdown-one-column dropdown-basic'} toggle={toggleDropdown} isOpen={isOpening}>
                <DropdownToggle
                    disabled={props.disabled}
                    tag='button'
                    className={classnames('btn', styles['btn-dropdown'], classNameDefault)}
                    caret
                >
                    {renderDropdownLabel()}
                </DropdownToggle>
                <DropdownMenu className={'box-shadow'} flip={props.flip} style={{width: '100%', outline: 'none'}}>
                    {!disableSearch && (
                        <div className='head'>
                            <div className={styles['input-search']}>
                                <input
                                    type='text'
                                    value={search}
                                    placeholder={props.configs.input_placeholder}
                                    onChange={onSearch}
                                />
                            </div>
                        </div>
                    )}
                    <div className='body position-relative'>
                        {isLoading && <Loading marginTop='15%' isShowLoading={false} />}
                        <div
                            className='scrollbar'
                            onScroll={scrolled}
                            style={props.setStyleScroll}
                            ref={ref => (container.current = ref)}
                        >
                            <ul className='list-item-name' style={{minHeight: '200px', width: '100%'}}>
                                {renderItems()}
                            </ul>
                        </div>
                    </div>
                </DropdownMenu>
            </UncontrolledDropdown>
        </div>
    );
};

SearchDropdown.defaultProps = defaultProps;

export default SearchDropdown;
