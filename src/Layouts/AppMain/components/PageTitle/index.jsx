import React from 'react';

// components
import PageTitleActions from '../PageTitleActions';

const PageTitle = (props) => {
    return <div className="app-page-title">
        <div className="page-title-wrapper">
            <div className="page-title-heading">
                <div className="page-title-icon">
                    <i className="{{ htmlWebpackPlugin.options.heading_icon }}" />
                </div>
                <div>{'{'}{'{'} htmlWebpackPlugin.options.title {'}'}{'}'}
                    <div className="page-title-subheading">{'{'}{'{'} htmlWebpackPlugin.options.description {'}'}{'}'}
                    </div>
                </div>
            </div>
            <PageTitleActions />
        </div>
    </div>;
};

export default PageTitle;