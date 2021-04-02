'use strict';

import React from 'react';
import Summary from 'Layouts/AppMain/components/Summary';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer.create(<Summary />).toJSON();

    expect(tree).toMatchSnapshot();
});