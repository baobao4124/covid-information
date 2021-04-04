'use strict';

import React from 'react';
import Summary from 'Layouts/AppMain/components/Summary';
import renderer from 'react-test-renderer';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

it('renders correctly', () => {
    const tree = renderer.create(<Summary />).toJSON();

    expect(tree).toMatchSnapshot();
});

test('Testing render correct', () => {
    const component = shallow(<Summary />);

    component.find('.text-white > span').forEach(node => {
        expect(node.text()).toEqual('0');
    });
});
