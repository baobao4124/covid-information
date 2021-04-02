import React from 'react';
import {withRouter} from 'react-router-dom';
// Components
import AppHeader from 'Layouts/AppHeader';
import AppMain from 'Layouts/AppMain';
// import AppFooter from 'Layouts/AppFooter';
import ThemeOptions from 'Layouts/ThemeOptions';

// Utils
import StateProvider from './contextStore';

// Styles
import '@antscorp/components/main.css';
import 'Assets/css/base.scss';
import 'Assets/css/style.scss';

const Layouts = (props) => {
    return (
        <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
            <AppHeader />
            <AppMain {...props} />
            <ThemeOptions />
        </div>
    );
};

export default Layouts;