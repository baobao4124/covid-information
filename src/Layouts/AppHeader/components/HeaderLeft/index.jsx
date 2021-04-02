import React from 'react';

const HeaderLeft = (props) => {
    return <>
        <div className="search-wrapper">
            <div className="input-holder">
                <input type="text" className="search-input" placeholder="Type to search" />
                <button className="search-icon"><span /></button>
            </div>
            <button className="close" />
        </div>
        <ul className="header-menu nav">
            <li className="nav-item">
                <a href="javascript:void(0);" className="nav-link">
                    <i className="nav-link-icon fa fa-database"> </i>
          Statistics
                </a>
            </li>
            <li className="btn-group nav-item">
                <a href="javascript:void(0);" className="nav-link">
                    <i className="nav-link-icon fa fa-edit" />
          Projects
                </a>
            </li>
            <li className="dropdown nav-item">
                <a href="javascript:void(0);" className="nav-link">
                    <i className="nav-link-icon fa fa-cog" />
          Settings
                </a>
            </li>
        </ul>
    </>;
};

export default HeaderLeft;