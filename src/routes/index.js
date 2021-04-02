import React from 'react';

const Layouts = React.lazy(() => import('Layouts'));
const NotFound = React.lazy(() => import('Modules/NotFound'));

let routes = [
    {
        state: 'home',
        path: '/',
        exact: true,
        name: 'Home',
        component: Layouts,
        resources: []
    }
];

// Convert nested routes to simple routes
function convertNestedRoutes(routes) {
    try {
        if (routes.length) {
            routes.forEach(function (route) {
                if (route.resources && route.resources.length) {
                    routes = routes.concat(convertNestedRoutes(route.resources));
                }
            });
        }

        return routes;
    } catch (e) {
        // Error
    }
}

routes = convertNestedRoutes(routes);

export default routes;