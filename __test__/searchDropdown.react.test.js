'use strict';

import React from 'react';
import SearchDropdown from 'Src/components/SearchDropdown';
import renderer from 'react-test-renderer';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

it('renders correctly', () => {
    const component = renderer.create(<SearchDropdown />);
    let tree = component.toJSON();

    expect(tree).toMatchSnapshot();
});

test('Testing render ', () => {
    const component = shallow(<SearchDropdown />);

    expect(component.exists('.container-field')).toEqual(true);
});

test('Testing prop component', () => {
    const defaultProp = {
        backgroundColor: 'black',
        className: 'btn-component',
        disabled: true
    };

    const component = shallow(<SearchDropdown {...defaultProp} />);

    component.setProps({style: defaultProp.backgroundColor});

    expect(component.find('.container-field').props().style).toEqual(defaultProp.backgroundColor);

    expect(component.find('.dropdown-one-column .btn').hasClass(defaultProp.className)).toEqual(true);

    expect(component.find('.btn-dropdown').props().disabled).toEqual(true);
});
