import { lazy } from 'react';
import paths from './paths';

const { private: privatePaths, public: publicPaths } = paths

/** 
* Apply lazy dynamic import, for loading page faster.
* It will not load in background, if that page is not opened. 
*/
const Dashboard = lazy(() => import('../Pages/Dashboard'))


/* ------ Authentication ------ */
const AUTH_COMPONENTS = {
    LOGIN: lazy(() => import('../Pages/Auth/Login')),
    SIGNUP: lazy(() => import('../Pages/Auth/Signup')),
    RESET_PASSWORD: lazy(() => import('../Pages/Auth/ResetPassword')),
}

const AUTH_ROUTES = [
    { path: publicPaths.auth.login, element: <AUTH_COMPONENTS.LOGIN />, isPublic: true },
    { path: publicPaths.auth.signup, element: <AUTH_COMPONENTS.SIGNUP />, isPublic: true },
    { path: publicPaths.auth.resetPassword(':token'), element: <AUTH_COMPONENTS.RESET_PASSWORD />, isPublic: true },
]


export const routesElement = [
    ...AUTH_ROUTES,
    { path: privatePaths.dashboard, element: <Dashboard />, isPrivate: true },
]
