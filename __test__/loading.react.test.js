'use strict';

import React from 'react';
import Loading from 'Src/components/Loading';
import renderer from 'react-test-renderer';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

it('renders correctly', () => {
    const component = renderer.create(<Loading top={10} />);
    let tree = component.toJSON();

    expect(tree).toMatchSnapshot();
});

test('Testing render correct style', () => {
    const loadingStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        paddingTop: '10px',
        zIndex: 1000
    };

    const loadingIcon = {
        marginTop: '-60px',
        marginLeft: 'auto',
        marginRight: 'auto'
    };
    
    let component = shallow(<Loading loading={loadingStyle} />);

    expect(component.find('.loading .text-center').text()).toEqual('Loading ...');
    expect(component.find('.loading').props().style).toEqual(loadingStyle);

    component.setProps({isShowLoading: false});
    
    expect(component.find('.loading .text-center')).toEqual({});
    
    component.setProps(loadingIcon);
    
    expect(component.find('.loading > .loading-icon').props().style).toEqual(loadingIcon);
});
