'use strict';

import React from 'react';
import Loading from 'Src/components/Loading';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer.create(<Loading />).toJSON();

    expect(tree).toMatchSnapshot();
});