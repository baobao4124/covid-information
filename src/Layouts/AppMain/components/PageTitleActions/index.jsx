import React from 'react';

const PageTitleActions = (props) => {
    return <div className="page-title-actions">
        <button type="button" data-toggle="tooltip" title="Example Tooltip" data-placement="bottom" className="btn-shadow mr-3 btn btn-dark">
            <i className="fa fa-star" />
        </button>
        <div className="d-inline-block dropdown">
            <button type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="btn-shadow dropdown-toggle btn btn-info">
                <span className="btn-icon-wrapper pr-2 opacity-7">
                    <i className="fa fa-business-time fa-w-20" />
                </span>
        Buttons
            </button>
            <div tabIndex={-1} role="menu" aria-hidden="true" className="dropdown-menu dropdown-menu-right">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <a href="javascript:void(0);" className="nav-link">
                            <i className="nav-link-icon lnr-inbox" />
                            <span>
                Inbox
                            </span>
                            <div className="ml-auto badge badge-pill badge-secondary">86</div>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="javascript:void(0);" className="nav-link">
                            <i className="nav-link-icon lnr-book" />
                            <span>
                Book
                            </span>
                            <div className="ml-auto badge badge-pill badge-danger">5</div>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="javascript:void(0);" className="nav-link">
                            <i className="nav-link-icon lnr-picture" />
                            <span>
                Picture
                            </span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a disabled href="javascript:void(0);" className="nav-link disabled">
                            <i className="nav-link-icon lnr-file-empty" />
                            <span>
                File Disabled
                            </span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>;
};

export default PageTitleActions;