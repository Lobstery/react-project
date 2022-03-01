import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { routes } from '../router/routes';

const AppRouter = () => {
    return (
        <Routes>
            {routes.map(route =>
                <Route element={route.element} path={route.path} exact={route.exact}></Route>
            )}
            <Route path='/*' element={<Navigate replace to='/error' />} />
        </Routes>
    );
};

export default AppRouter;