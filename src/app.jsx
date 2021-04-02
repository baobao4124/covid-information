import React from 'react';
import store from './store';
import {Provider} from 'react-redux';
import {HashRouter  as Router, Switch, Route} from 'react-router-dom';

// Components
import LayoutsContainer from 'Layouts';

const Layouts = () => {
    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route path="/" name="Home" component={LayoutsContainer} />
                </Switch>
            </Router>
        </Provider>
    );
};

export default Layouts;