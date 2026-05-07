import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import paths from './paths';
import { getCookie } from '../Utils/helper';
import authGrid from '../Assets/images/auth-grid.svg';

const PublicRoute = () => {
    const token = getCookie(import.meta.env.VITE_TOKEN_KEY);
    const { pathname } = useLocation();
    const [isFading, setIsFading] = useState(false);
    const [currentText, setCurrentText] = useState('');

    const getTextForPath = (path) => {
        if (path === paths.public.auth.login) {
            return "Dashboard unlocked - almost. Enter your credentials.";
        } else if (path === paths.public.auth.signup) {
            return "Create your account and start organizing work with clarity.";
        } else {
            return "Reset your password and reclaim your dashboard.";
        }
    };

    // Fade animation for the text (Below text of logo)
    useEffect(() => {
        const newText = getTextForPath(pathname);
        if (newText !== currentText) {
            setIsFading(true);
            const timer = setTimeout(() => {
                setCurrentText(newText);
                setIsFading(false);
            }, 300); // Half of the fade duration
            return () => clearTimeout(timer);
        }
    }, [pathname, currentText]);

    if (token) {
        return <Navigate to={paths.private.dashboard} replace />;
    }
    return (
        <div className='auth-container'>
            <div className="auth-form">
                <Outlet />
            </div>
            <div className="auth-image">
                <img src={authGrid} alt="Auth Grid" className='auth-grid' draggable={false} />
                {/* <img src={authLogo} alt="Auth" className='auth-logo' draggable={false} /> */}
                <h1 className='text-white'>Smart Task Manager</h1>
                <div className={`auth-text ${ isFading ? 'fade-out' : 'fade-in' }`}>
                    <p>{currentText}</p>
                </div>
            </div>
        </div>
    )
};

export default PublicRoute;
