import React from 'react';

const HeaderRight = (props) => {
    return <div className="header-btn-lg pr-0">
        <div className="widget-content p-0">
            <div className="widget-content-wrapper">
                <div className="widget-content-left">
                    <div className="btn-group">
                        <a data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="p-0 btn">
                            <img width={42} className="rounded-circle" src="assets/images/avatars/1.jpg" alt="" />
                            <i className="fa fa-angle-down ml-2 opacity-8" />
                        </a>
                        <div tabIndex={-1} role="menu" aria-hidden="true" className="dropdown-menu dropdown-menu-right">
                            <button type="button" tabIndex={0} className="dropdown-item">User Account</button>
                            <button type="button" tabIndex={0} className="dropdown-item">Settings</button>
                            <h6 tabIndex={-1} className="dropdown-header">Header</h6>
                            <button type="button" tabIndex={0} className="dropdown-item">Actions</button>
                            <div tabIndex={-1} className="dropdown-divider" />
                            <button type="button" tabIndex={0} className="dropdown-item">Dividers</button>
                        </div>
                    </div>
                </div>
                <div className="widget-content-left  ml-3 header-user-info">
                    <div className="widget-heading">
            Alina Mclourd
                    </div>
                    <div className="widget-subheading">
            VP People Manager
                    </div>
                </div>
                <div className="widget-content-right header-user-info ml-3">
                    <button type="button" className="btn-shadow p-1 btn btn-primary btn-sm show-toastr-example">
                        <i className="fa text-white fa-calendar pr-1 pl-1" />
                    </button>
                </div>
            </div>
        </div>
    </div>;
};

export default HeaderRight;