import React from 'react'
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom'

import paths from './paths'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import { routesElement } from './data'

function AllRoutes () {
    const { private: privatePaths } = paths
    return (
        <BrowserRouter>
            <Routes>
                {routesElement.map((route, index) => (
                    route.isPublic ? (
                        <Route key={`public-${ route.path }-${ index }`} element={<PublicRoute />}>
                            <Route path={route.path} element={route.element} />
                        </Route>
                    ) : (
                        <Route key={`private-${ route.path }-${ index }`} element={<PrivateRoute />}>
                            <Route path={route.path} element={route.element} />
                        </Route>
                    )
                ))}
                <Route path='*' element={<Navigate to={privatePaths.dashboard} />} />
            </Routes>
        </BrowserRouter>
    )
}

export default React.memo(AllRoutes)
