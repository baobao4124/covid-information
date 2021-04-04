'use strict';
import '@testing-library/jest-dom';

// Libraries
import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import TableVirtualized from 'Layouts/AppMain/components/TableVirtualized';

// Table part
test('Testing Table Virtualized render', () => {
    render(<TableVirtualized />);
});

test('Testing TableVirtualized render headers', () => {
    const headers = [{
        dataKey: 'Start_time',
        label: 'Start time',
        width: 50
    },{
        dataKey: 'End_time',
        label: 'End time',
        width: 50
    }];

    render(
        <TableVirtualized headers={headers} />
    );

    const headersElement = document.querySelector('.header-row');
    const numberChild = headersElement.childNodes.length;

    expect(numberChild).toBeGreaterThanOrEqual(headers.length);
});

test('Testing TableVirtualized render rows', async () => {
    const headers = [{
        dataKey: 'Start_time',
        label: 'Start time',
        width: 50
    },{
        dataKey: 'End_time',
        label: 'End time',
        width: 50
    }];

    const rows = [
        {
            Index: 1,
            Start_time: '15/06/2016 11:13:27',
            End_time: '15/06/2016 11:13:27'
        },
        {
            Index: 2,
            Start_time: '15/06/2016 11:13:27',
            End_time: '15/06/2016 11:13:27'
        },
        {
            Index: 3,
            Start_time: '15/06/2016 11:13:27',
            End_time: '15/06/2016 11:13:27'
        },
        {
            Index: 4,
            Start_time: '15/06/2016 11:13:27',
            End_time: '15/06/2016 11:13:27'
        },
        {
            Index: 5,
            Start_time: '15/06/2016 11:13:27',
            End_time: '15/06/2016 11:13:27'
        },
        {
            Index: 6,
            Start_time: '15/06/2016 11:13:27',
            End_time: '15/06/2016 11:13:27'
        }
    ];

    render(
        <div style={{height: 400, width: 400}}>
            <TableVirtualized headers={headers} rows={rows} height={400} />
        </div>
    );

    const tableElement = document.querySelector('.ReactVirtualized__Table');
    const rowsNumber = tableElement.getAttribute('aria-rowcount');

    expect(+rowsNumber).toBeGreaterThanOrEqual(rows.length);
});

// Footer part
test('Testing Table Virtualized has footer', () => {
    render(
        <TableVirtualized />
    );

    const footerElement = document.querySelector('.wrap-table-footer');
    
    expect(footerElement).toBeInTheDocument;
});

test('Testing Table Virtualized click button footer will render menu', () => {
    const headers = [{
        dataKey: 'Start_time',
        label: 'Start time',
        width: 50
    },{
        dataKey: 'End_time',
        label: 'End time',
        width: 50
    }];

    const rows = [
        {
            Index: 1,
            Start_time: '15/06/2016 11:13:27',
            End_time: '15/06/2016 11:13:27'
        },
        {
            Index: 2,
            Start_time: '15/06/2016 11:13:27',
            End_time: '15/06/2016 11:13:27'
        },
        {
            Index: 3,
            Start_time: '15/06/2016 11:13:27',
            End_time: '15/06/2016 11:13:27'
        },
        {
            Index: 4,
            Start_time: '15/06/2016 11:13:27',
            End_time: '15/06/2016 11:13:27'
        },
        {
            Index: 5,
            Start_time: '15/06/2016 11:13:27',
            End_time: '15/06/2016 11:13:27'
        },
        {
            Index: 6,
            Start_time: '15/06/2016 11:13:27',
            End_time: '15/06/2016 11:13:27'
        }
    ];

    render(
        <div style={{height: 400, width: 400}}>
            <TableVirtualized headers={headers} rows={rows} height={400} />
        </div>
    );

    const btnElement = document.querySelector('.dropdown-toggle');

    fireEvent.click(btnElement);

    const menuDropdown = document.querySelector('.dropdown-menu-rows');
    
    expect(menuDropdown).toBeInTheDocument;
});