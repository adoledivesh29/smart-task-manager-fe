import { Navigate, Outlet } from 'react-router-dom';
import { getCookie } from '../Utils/helper';
import Header from '../Common/Components/Header/Header';
import paths from './paths';

const PrivateRoute = () => {
    const token = getCookie(import.meta.env.VITE_TOKEN_KEY);

    if (!token) {
        return <Navigate to={paths.public.auth.login} replace={true} />;
    }
    return (
        <div className='main-layout'>
            <Header />
            <div className='main-content'>
                <div className='inner-container'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
export default PrivateRoute;
