// Libraries
import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const defaultProps = {
    top: 0,
    marginTop: 0,
    isShowLoading: true,
    loading: {},
    loadingIcon: {}
};

const Loading = (props) => {
    return (
        <div className="loading" style={{top: props.top, paddingTop: props.paddingTop, zIndex: 1005, ...props.loading}}>
            <div className="loading-icon" style={{marginTop: props.marginTop, marginLeft: 'auto', marginRight: 'auto', ...props.loadingIcon}} />
            {
                props.isShowLoading && <div className="text-center font-weight-bold">Loading ...</div>
            }
        </div>
    );
};

Loading.propTypes = {
    top: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    marginTop: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    isShowLoading: PropTypes.bool,
    loading: PropTypes.object,
    loadingIcon: PropTypes.object
};

Loading.defaultProps = defaultProps;

export default Loading;
