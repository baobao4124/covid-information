// Libraries
import React, {useState} from 'react';
import produce from 'immer';
import classnames from 'classnames';

// Component
import {TableVirtualized, MainTable, Icon} from '@antscorp/components';

// Styles
import styles from './styles.module.scss';
import {getObjectPropSafely} from 'Src/utils';

const headers = [{
    dataKey: 'Country',
    label: 'Country',
    width: 20
},{
    dataKey: 'Confirmed',
    label: 'Confirmed',
    width: 20
},{
    dataKey: 'Recovered',
    label: 'Recovered',
    width: 20
},{
    dataKey: 'Deaths',
    label: 'Deaths',
    width: 20
},{
    dataKey: 'Date',
    label: 'Date',
    width: 20
}];

const Table = (props) => {

    return (
        <>
            <TableVirtualized
                headers={headers}
                rows={getObjectPropSafely(() => props.data || [])}
                page={1}
                totalRecord={0}
            />
        </>
    );
};

export default Table;