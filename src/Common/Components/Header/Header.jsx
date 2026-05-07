import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import IconSettings from '../../../Assets/images/icons/settings.svg';
import IconSignout from '../../../Assets/images/icons/sign-out.svg';
import * as ICONS from '../Sidebar/icons';
import CustomModal from '../CustomModal/CustomModal';
import ChangePassword from './ChangePassword/ChangePassword';
import ProfileDetails from './ProfileDetails/ProfileDetails';
import { useForm } from 'react-hook-form';
import paths from '../../../Routes/paths';
import { useGetProfileQuery, useLogoutMutation } from '../../../Pages/Auth/Hooks/useAuthentication';

const getProfileValue = (profile, keys, fallback = '') => {
    for (const key of keys) {
        const value = profile?.[key];
        if (value !== undefined && value !== null && value !== '') return value;
    }

    return fallback;
};

const Header = () => {
    const { data: profile = {} } = useGetProfileQuery();
    const { mutate: logoutUser, isLoading: isLoggingOut } = useLogoutMutation();
    const {
        control: passwordControl,
        handleSubmit: handlePasswordSubmit,
        getValues,
        reset: resetPasswordForm
    } = useForm({ mode: 'all' });
    const {
        control: profileControl,
        handleSubmit: handleProfileSubmit,
        reset: resetProfileForm
    } = useForm({ mode: 'all' });

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [modal, setModal] = useState({ open: false, type: null });

    const menuRef = useRef(null);
    const userName = getProfileValue(profile, ['sUserName', 'userName', 'username', 'name'], 'Account');
    const email = getProfileValue(profile, ['sEmail', 'email']);
    const avatarInitial = (userName || email || 'A').charAt(0).toUpperCase();

    const handleProfileClick = useCallback(() => {
        setIsMenuOpen(prev => !prev);
    }, []);

    useEffect(() => {
        if (!isMenuOpen) return;
        const handleClickOutside = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                !event.target.closest('.profile-button')
            ) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMenuOpen]);

    return (
        <>
            <header className="app-navbar">
                <div className="navbar-left">
                    <Link to={paths.private.dashboard} className="navbar-brand">
                        Smart Task Manager
                    </Link>
                </div>

                <div className="navbar-right">
                    <button className="profile-button" onClick={handleProfileClick}>
                        <div className="profile-avatar">
                            {avatarInitial}
                        </div>
                        <span className="profile-name">{userName}</span>
                        <span className={`chevron-icon ${isMenuOpen ? 'open' : ''}`}>
                            <ICONS.DOWN_ARROW_ICON />
                        </span>
                    </button>
                </div>
            </header>

            {isMenuOpen && (
                <div className="header-menu open" ref={menuRef}>
                    <div className="name">{userName}</div>
                    {email && <div className="email">{email}</div>}
                    <ul>
                        <li>
                            <button
                                type="button"
                                onClick={() => {
                                    setModal({ open: true, type: 'profile' });
                                    setIsMenuOpen(false);
                                }}
                            >
                                <span className="menu-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M20 21a8 8 0 0 0-16 0" strokeLinecap="round" />
                                        <circle cx="12" cy="8" r="4" />
                                    </svg>
                                </span>
                                Profile
                            </button>
                        </li>
                        <li>
                            <button
                                type="button"
                                onClick={() => {
                                    setModal({ open: true, type: 'changePassword' });
                                    setIsMenuOpen(false);
                                }}
                            >
                                <img src={IconSettings} alt="" /> Change Password
                            </button>
                        </li>
                    </ul>
                    <hr />
                    <button
                        onClick={() => setModal({ open: true, type: 'logout' })}
                        className="signout-button"
                    >
                        <img src={IconSignout} alt="" /> Sign out
                    </button>
                </div>
            )}

            <CustomModal
                open={modal.open && modal.type === 'logout'}
                title='Logout'
                subtitle='Are you sure you want to logout?'
                isLoading={isLoggingOut}
                handleClose={() => setModal({ open: false, type: null })}
                handleConfirm={() => {
                    logoutUser();
                }}
            />

            <CustomModal
                open={modal.open && modal.type === 'profile'}
                title='Profile Details'
                subtitle='View your account details and update your username.'
                handleClose={() => {
                    setModal({ open: false, type: null });
                    resetProfileForm();
                }}
                isForm
                maxWidth='sm'
            >
                <div className='modal-content'>
                    <ProfileDetails
                        setModal={setModal}
                        control={profileControl}
                        handleSubmit={handleProfileSubmit}
                        reset={resetProfileForm}
                    />
                </div>
            </CustomModal>

            <CustomModal
                open={modal.open && modal.type === 'changePassword'}
                title='Change Password'
                subtitle='Enter your new password'
                handleClose={() => {
                    setModal({ open: false, type: null });
                    resetPasswordForm();
                }}
                isForm
            >
                <div className='modal-content'>
                    <ChangePassword
                        modal={modal}
                        setModal={setModal}
                        control={passwordControl}
                        handleSubmit={handlePasswordSubmit}
                        getValues={getValues}
                        reset={resetPasswordForm}
                    />
                </div>
            </CustomModal>
        </>
    );
};

export default Header;
