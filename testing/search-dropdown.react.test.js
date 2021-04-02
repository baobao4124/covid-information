'use strict';

import React from 'react';
import SearchDropdown from 'Src/components/SearchDropdown';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer.create(<SearchDropdown />).toJSON();

    expect(tree).toMatchSnapshot();
});