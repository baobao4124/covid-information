// Libraries
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

// Components
import {AutoSizer, Column, Table} from 'react-virtualized';

// Utils
import {getObjectPropSafely} from 'Src/utils';

// Styles
import 'react-virtualized/styles.css';
import styles from './styles.module.scss';

// Force Update

const MainTable = (props) => {
    const {
        headers = [], 
        rows = [], 
        height = 400,
        headerHeight = 47,
        rowHeight = 51,
        gridClassName = styles['grid-display-body'], 
        headerClassName = styles['header-column'],
        renderNoData,
        rowClassNameHeader,
        rowClassNameBody,
        translate
    } = props;

    const configHeaders = (headers, width) => {
        try {
            let config = null;

            if (Array.isArray(headers)) {
                config = headers.map((header) => {
                    if (!header) {return null}
                    const numberColumn = getObjectPropSafely(() => headers.length);
                    const widthColumn = getObjectPropSafely(() => width / numberColumn);

                    return <Column 
                        key={header.dataKey} 
                        label={header.label} 
                        dataKey={header.dataKey}
                        width={widthColumn}
                    />;
                });
            }
    
            return config;
        } catch (error) {
            if (typeof props.onError === 'function') {
                props.onError(error, {
                    action: 'configHeaders',
                    args: {}
                });
            }
        }
    };

    const rowClassName = ({index}) => {
        try {
            if (index < 0) {
                return classnames(styles['header-row'], rowClassNameHeader);
            } else {
                return classnames(styles['body-row'], rowClassNameBody);
            }
        } catch (error) {
            if (typeof props.onError === 'function') {
                props.onError(error, {
                    action: 'rowClassName',
                    args: {}
                });
            }
        }
    };

    const headerRowRenderer = ({className, style}, headers) => {
        try {
            return (
                <div key={'header-row-table-virtualized'} className={className} style={style}>
                    {
                        headers.map((header) => {
                            const {width, paddingRight} = style;
                            const cellData = getObjectPropSafely(() => header.label);
                            const percentWidth = getObjectPropSafely(() => header.width);
                            const widthColumn = getObjectPropSafely(() => (width - paddingRight) * percentWidth / 100);
    
                            return <div 
                                key={header.dataKey} 
                                className={headerClassName}
                                style={{width: widthColumn}}
                            >
                                {translate(cellData)}
                            </div>;
                        })
                    }
                </div>
            );
        } catch (error) {
            if (typeof props.onError === 'function') {
                props.onError(error, {
                    action: 'headerRowRenderer',
                    args: {}
                });
            }
        }
    };

    const noRowsRenderer = () => {
        try {
            if (typeof renderNoData === 'function') {
                return renderNoData();
            }
    
            if (typeof renderNoData === 'string') {
                return (<div className={classnames(styles['body-row'], styles['no-data'])}>
                    {renderNoData}
                </div>);
            }
            
            return (<div className={classnames(styles['body-row'], styles['no-data'])}>
                No data
            </div>); 
        } catch (error) {
            if (typeof props.onError === 'function') {
                props.onError(error, {
                    action: 'noRowsRenderer',
                    args: {}
                });
            }
        }
    };
    
    return (
        <>
            <AutoSizer disableHeight >
                {({width}) => {
                    return (
                        <Table
                            width={width}
                            height={height}
                            gridClassName={gridClassName}
                            headerHeight={headerHeight}
                            headerClassName={headerClassName}
                            headerRowRenderer={(data) => headerRowRenderer(data, headers)}
                            rowHeight={rowHeight}
                            rowClassName={rowClassName}
                            rowCount={rows && rows.length || 0}
                            rowGetter={({index}) => getObjectPropSafely(() => rows[index])}
                            noRowsRenderer={noRowsRenderer}
                        >
                            {configHeaders(headers, width)}
                        </Table>
                    );}}
            </AutoSizer>   
        </>
    );
};

MainTable.propTypes = {
    translate: PropTypes.func
};

MainTable.defaultProps = {
    translate: (val) => val
};

export default MainTable;