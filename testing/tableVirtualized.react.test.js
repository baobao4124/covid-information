'use strict';

import React from 'react';
import MainTable from 'Layouts/AppMain/components/TableVirtualized/components/Main/index';
import FooterTable from 'Layouts/AppMain/components/TableVirtualized/components/Footer';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer.create(<MainTable />).toJSON();

    expect(tree).toMatchSnapshot();
});

it('renders footer correctly', () => {
    const tree = renderer.create(<FooterTable />).toJSON();

    expect(tree).toMatchSnapshot();
});