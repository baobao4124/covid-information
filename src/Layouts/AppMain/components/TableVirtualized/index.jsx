// Libraries
import React from 'react';
import PropTypes from 'prop-types';

// Components
import Main from './components/Main';
import Footer from './components/Footer';

const headers = [{
    dataKey: 'Country',
    label: 'Country',
    width: 20
},{
    dataKey: 'Confirmed',
    label: 'Confirmed',
    width: 20
},{
    dataKey: 'Deaths',
    label: 'Deaths',
    width: 20
},{
    dataKey: 'Recovered',
    label: 'Recovered',
    width: 20
},{
    dataKey: 'Date',
    label: 'Date',
    width: 20
}];

const TableVirtualized = (props) => {
    const {
        rows = [],
        isShowFooter = true, 
        height,
        headerHeight,
        rowHeight,
        gridClassName, 
        headerClassName,
        renderNoData,
        rowClassNameHeader,
        rowClassNameBody,
        translate
    } = props;
    const onClickChangePage = (page) => {
        if (page && typeof props.changePage === 'function') {
            props.changePage(page);
        }
    };

    return (
        <>
            <Main
                translate={translate}
                headers={headers} 
                rows={rows}
                height={height}
                headerHeight={headerHeight}
                rowHeight={rowHeight}
                gridClassName={gridClassName}
                headerClassName={headerClassName}
                renderNoData={renderNoData}
                rowClassNameHeader={rowClassNameHeader}
                rowClassNameBody={rowClassNameBody}
            />
            {
                Array.isArray(rows) && rows.length && isShowFooter > 0 ? <Footer translate={translate} page={props.page} callBackLimit={props.callBackLimit} totalRecord={props.totalRecord} changePage={onClickChangePage} /> : null
            }
        </>
    );
};

TableVirtualized.propTypes = {
    changePage: PropTypes.func,
    totalRecord: PropTypes.number,
    callBackLimit: PropTypes.func,
    page: PropTypes.number,
    translate: PropTypes.func
};

export default TableVirtualized;
export const MainTable = Main;