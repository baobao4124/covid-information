import React from 'react';

// Components
import AppHeader from 'Layouts/AppHeader';
import AppMain from 'Layouts/AppMain';

// Styles
import '@antscorp/components/main.css';
import 'Assets/css/base.scss';
import 'Assets/css/style.scss';

const Layouts = (props) => {
    return (
        <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
            <AppHeader />
            <AppMain {...props} />
        </div>
    );
};

export default Layouts;