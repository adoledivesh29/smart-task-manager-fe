import { useForm } from 'react-hook-form';
import CommonInput from '../../Common/Components/CommonInput/CommonInput';
import { Button, CircularProgress } from '@mui/material';
import { useCheckTokenMutation, useResetPasswordMutation } from './Hooks/useAuthentication';
import { useEffect, useState } from 'react';
import { PROJECT_NAME } from '../../Common/Constant';
import { Link, useNavigate, useParams } from 'react-router-dom';
import paths from '../../Routes/paths';
import notFound from '../../Assets/images/404.svg';
import { useQueryClient } from 'react-query';
import { API_KEYS } from '../../Common/Constant/API_KEYS';

const ResetPassword = () => {
    const { token } = useParams()
    const navigate = useNavigate()
    const query = useQueryClient()

    const [tokenWrong, setTokenWrong] = useState(false)
    const { control, handleSubmit, reset, setError, clearErrors, watch } = useForm({ mode: "all", });

    const { mutate, isLoading } = useResetPasswordMutation({ reset })
    const { isLoading: tokenLoading } = useCheckTokenMutation({ setTokenWrong, token })

    const onSubmit = (data) => {
        query.invalidateQueries([API_KEYS.CHECK_TOKEN])

        if (tokenWrong) {
            setTokenWrong(true)
        } else {
            mutate({ sNewPassword: data.sNewPassword, sConfirmPassword: data.sConfirmPassword, token })
        }
    };

    useEffect(() => {
        document.title = PROJECT_NAME + ' | Reset Password'
    }, [])

    return (
        <div className='auth-page'>
            <div className='title'>Reset Your Password</div>
            <div className="sub-title">Enter your new password to reset password!</div>
            <div className="line"></div>

            {token && !tokenWrong ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CommonInput
                        name="sNewPassword"
                        label="New Password"
                        control={control}
                        type="password"
                        required
                        placeholder="Enter your new password"
                        maxLength={25}
                        rules={{
                            required: {
                                value: true,
                                message: "* Please enter your new password"
                            },
                            minLength: {
                                value: 8,
                                message: "* Password must be at least 8 characters",
                            },
                            maxLength: {
                                value: 25,
                                message: "* Password must not exceed 20 characters",
                            },
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.,;'\[\]{}!#$%^&*()_+=\-|:;"<>?/\\]).{8,25}$/,
                                message: "* Password must include uppercase, lowercase, number & special character.",
                            },
                        }}
                    />

                    <CommonInput
                        name="sConfirmPassword"
                        type="password"
                        label="Confirm Password"
                        placeholder="Enter your confirm password"
                        required
                        control={control}
                        onChange={(e) => {
                            if (e.target.value !== watch('sNewPassword')) {
                                setError('sConfirmPassword', { message: "* Password does not match" })
                            } else {
                                clearErrors('sConfirmPassword')
                            }
                        }}
                        maxLength={25}
                        rules={{
                            required: {
                                value: true,
                                message: "* Please enter your confirm password"
                            },
                            minLength: {
                                value: 8,
                                message: "* Password must be at least 8 characters",
                            },
                            maxLength: {
                                value: 25,
                                message: "* Password must not exceed 25 characters",
                            },
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.,;'\[\]{}!#$%^&*()_+=\-|:;"<>?/\\]).{8,25}$/,
                                message: "* Password must include uppercase, lowercase, number & special character.",
                            },
                            validate: (value) => {
                                if (value !== watch('sNewPassword')) {
                                    return "* Password does not match"
                                }
                                return true
                            }
                        }}
                    />

                    <div className='forgot-password-link'>
                        <Link to={paths.public.auth.login}>Back to Login</Link>
                    </div>

                    <Button type="submit" className='submit-button'>
                        Reset Password {isLoading || tokenLoading && <CircularProgress className='mx-2' size="14px" color='var(--white-color)' />}
                    </Button>

                    <div className='password-remember-link auth-switch-link'>
                        Need a new account? <Link to={paths.public.auth.signup}>Sign Up</Link>
                    </div>
                </form>
            ) : (
                <>
                    <img src={notFound} alt="Not Found" className='not-found' draggable={false} />
                    <div className='not-found-text'>
                        <Button type="button" className='submit-button' onClick={() => navigate(paths.public.auth.login)}>
                            Go Back to Login
                        </Button>
                    </div>
                </>
            )}
        </div>
    )
}

export default ResetPassword
