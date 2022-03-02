import React, { useContext } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from '../context';
import { routes } from '../router/routes';
import { publicRoutes, privateRoutes } from '../router/routes';
import Loader from './UI/loader/Loader';

const AppRouter = () => {
    const { isAuth, isLoading } = useContext(AuthContext);
    if (isLoading) {
        return <Loader></Loader>
    }
    return (
        isAuth
            ?
            <Routes>
                {privateRoutes.map(route =>
                    <Route key={route.path} element={route.element} path={route.path} exact={route.exact}></Route>
                )}

                <Route path='/*' element={<Navigate replace to='/posts' />} />
            </Routes>
            :
            <Routes>
                {publicRoutes.map(route =>
                    <Route key={route.path} element={route.element} path={route.path} exact={route.exact}></Route>
                )}

                <Route path='/*' element={<Navigate replace to='/login' />} />
            </Routes>
    );
};

export default AppRouter;