// Libraries
import React, {useState, useEffect} from 'react';
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import PropTypes from 'prop-types';
import {Icon} from '@antscorp/components';

// Style
import styles from './styles.module.scss';
import classnames from 'classnames';

// Utils
import {getObjectPropSafely} from 'Src/utils';

const rowsPerPage = [10, 30, 50, 100, 200, 500];

const Footer = (props) => {
    const constant = {
        FIRST: 'GO_TO_FIRST_PAGE',
        PREVIOUS: 'GO_TO_PREVIOUS_PAGE',
        NEXT: 'GO_TO_NEXT_PAGE',
        LAST: 'GO_TO_LAST_PAGE'
    };

    const [page, setPage] = useState(props.page);
    const [goToPage, setGoToPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalRecord, setTotalRecord] = useState(props.totalRecord);
    const [numberPage, setNumberPage] = useState(Number.isInteger(totalRecord / 10) ? Math.floor(totalRecord / 10) : Math.floor(totalRecord / 10) + 1);

    useEffect(() => {
        if (props.totalRecord !== totalRecord) {
            setTotalRecord(props.totalRecord);
            Number.isInteger(props.totalRecord / 10) ?
                setNumberPage(Math.floor(props.totalRecord / 10)) :
                setNumberPage(Math.floor(props.totalRecord / 10) + 1);
        }
    }, [props.totalRecord]);

    useEffect(() => {
        setPage(props.page);
    }, [props.page]);

    const onChangeGoToPage = (event) => {
        const value = getObjectPropSafely(() => event.target.value);
        const numberRegExp = /^(\d+.?\d{0,8})$/;

        if (numberRegExp.test(value) || !value) {
            if (+value <= numberPage) {
                setGoToPage(value);
            }
        }
    };

    const onKeyDownGoToPage = (event) => {
        if (+event.keyCode === 13) {
            props.changePage(parseInt(goToPage));
        }
    };

    const onSelectLimit = (rowsPerPage) => {
        if (+rowsPerPage >= totalRecord) {
            setNumberPage(1);
        } else {
            setNumberPage(Math.floor(totalRecord / +rowsPerPage) + 1);
        }
        if (rowsPerPage && typeof props.callBackLimit ===  'function') {
            setLimit(rowsPerPage);
            props.callBackLimit(rowsPerPage);
        }
    };

    const changePage = (action) => {
        if (action && typeof props.changePage !== 'undefined') {
            switch (action) {
                case constant.FIRST: {
                    props.changePage(1);
                    break;
                }
                case constant.PREVIOUS: {
                    props.changePage(page - 1);
                    break;
                }
                case constant.NEXT: {
                    props.changePage(page + 1);
                    break;
                }
                case constant.LAST: {
                    props.changePage(numberPage);
                    break;
                }
            }
        }
    };

    const renderPageNumberFooter = () => {
        let arrPageNumber = [];
        const lengthDisplay = 2;
        const targetPage = page;
        const beginPage = targetPage - lengthDisplay > 1 ? targetPage - lengthDisplay : 1;
        const endPage = targetPage + lengthDisplay < numberPage ? targetPage + lengthDisplay : numberPage;

        for (let i = beginPage; i <= endPage; i++) {
            arrPageNumber.push(
                <li key={`table-page-item-${i}`} className={classnames(styles['page-item'], styles[`${page === i && 'active'}`])}>
                    <a className={classnames(styles['page-link'])} onClick={() => changeTablePage(i)}>
                        {i}
                    </a>
                </li>
            );
        }

        if (targetPage > lengthDisplay + 1) {
            arrPageNumber.unshift(
                <li key={'table-page-item-begin'} className={classnames(styles['page-item'])}>
                    <a className={classnames(styles['page-link'])} onClick={() => changeTablePage(targetPage - lengthDisplay - 1)}>
                        ...
                    </a>
                </li>
            );
        }

        if (targetPage < numberPage - lengthDisplay) {
            arrPageNumber.push(
                <li key={'table-page-item-end'} className={classnames(styles['page-item'])}>
                    <a className={classnames(styles['page-link'])} onClick={() => changeTablePage(targetPage + 2 + 1)}>
                        ...
                    </a>
                </li>
            );
        }

        return arrPageNumber;
    };

    const changeTablePage = (page) => {
        if (typeof props.changePage === 'function') {
            props.changePage(page);
        }
    };

    const firstRange = page * limit - limit + 1;
    const lastRange = page * limit > totalRecord ? totalRecord : page * limit;

    return (
        <div
            className={classnames(styles['wrap-table-footer'])}
            style={{
                backgroundColor: 'white',
                border: '1px solid #e3eef1'
            }}>
            <div className={classnames(styles['record-table'])}>
                <span className={classnames(styles['record-name'])} style={{marginLeft: '30px'}}>
                    {props.translate('Go to page')}
                </span>
                <input
                    type="text"
                    style={{width: '30px', textAlign: 'center'}}
                    value={goToPage}
                    onChange={onChangeGoToPage}
                    onKeyDown={onKeyDownGoToPage}
                />
                <span className={classnames(styles['record-name'])}>
                    {props.translate('Show rows')}
                </span>
                <UncontrolledDropdown className="d-inline-block">
                    <DropdownToggle
                        color={'default'}
                        className={classnames(styles['btn-full'])}
                        caret
                    >
                        {limit}
                    </DropdownToggle>
                    {
                        Array.isArray(rowsPerPage) && (
                            <DropdownMenu
                                className={classnames(styles['dropdown-menu-rows'])}
                            >
                                {rowsPerPage.map((rowPerPage, rowPerPageKey) => {
                                    const classActive = +limit === +rowPerPage ? styles['active'] : '';

                                    return (
                                        <DropdownItem
                                            className={classnames(styles['dropdown-menu-rows-item'], classActive)}
                                            key={`dropdown-list-showPerPage-${rowPerPageKey}`}
                                            onClick={() => onSelectLimit(rowPerPage)}
                                        >
                                            {rowPerPage}
                                        </DropdownItem>
                                    );
                                })}
                            </DropdownMenu>
                        )
                    }
                </UncontrolledDropdown>
                <span className={classnames(styles['record-num'])}>
                    {`${firstRange} - ${lastRange} ${props.translate('of')} ${totalRecord}`}
                </span>
                <div className="d-inline-block">
                    <ul className={classnames(styles['pagination'])}>
                        <li onClick={page === 1 ? undefined : () => changePage(constant.FIRST)} className={classnames(styles['page-item'], styles[page === 1 && 'disabled'], 'first')} >
                            <a className={classnames(styles['page-link'])}>
                                <Icon type="icon-ants-step-backward" />
                            </a>
                        </li>
                        <li onClick={page === 1 ? undefined : () => changePage(constant.PREVIOUS)} className={classnames(styles['page-item'], styles[page === 1 && 'disabled'], 'prev')} >
                            <a className={classnames(styles['page-link'])}>
                                <Icon type="icon-ants-caret-left" />
                            </a>
                        </li>
                        {renderPageNumberFooter()}
                        <li onClick={page === numberPage ? undefined : () => changePage(constant.NEXT)} className={classnames(styles['page-item'], styles[page === numberPage && 'disabled'], 'next')} >
                            <a className={classnames(styles['page-link'])}>
                                <Icon type="icon-ants-caret-right" />
                            </a>
                        </li>
                        <li onClick={page === numberPage ? undefined : () => changePage(constant.LAST)} className={classnames(styles['page-item'], styles[page === numberPage && 'disabled'], 'last')} >
                            <a className={classnames(styles['page-link'])}>
                                <Icon type="icon-ants-step-forward" />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

Footer.propTypes = {
    changePage: PropTypes.func,
    page: PropTypes.number,
    numberPage: PropTypes.number,
    totalRecord: PropTypes.number,
    callBackLimit: PropTypes.func,
    translate: PropTypes.func
};

Footer.defaultProps = {
    page: 1,
    numberPage: 10,
    totalRecord: 100,
    callBackLimit: (value) => value,
    translate: (val) => val
};

export default Footer;