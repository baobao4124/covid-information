import React from 'react';

// Components
import Logo from './components/Logo';
import HeaderLeft from './components/HeaderLeft';
import HeaderRight from './components/HeaderRight';

const AppHeader = (props) => {
    return <div className="app-header header-shadow">
        <Logo />
    </div>;
};

export default AppHeader;