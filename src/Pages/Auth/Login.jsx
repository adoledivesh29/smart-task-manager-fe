import { useForm } from 'react-hook-form';
import CommonInput from '../../Common/Components/CommonInput/CommonInput';
import { Button, CircularProgress } from '@mui/material';
import paths from '../../Routes/paths';
import { FORM_VALIDATION } from '../../Common/Constant/validation';
import { useEffect } from 'react';
import { PROJECT_NAME } from '../../Common/Constant';
import { useLoginMutation } from './Hooks/useAuthentication';
import { Link } from 'react-router-dom';

const Login = () => {

    const { control, handleSubmit, reset } = useForm({ mode: "all", });
    const { mutate, isLoading } = useLoginMutation(reset)

    const onSubmit = (data) => {
        mutate({ sEmail: data.sEmail, sPassword: data.password })

        // setCookie(import.meta.env.VITE_TOKEN_KEY, 'sampleToken123', 7);
        // navigate(paths.private.dashboard);
    };

    useEffect(() => {
        document.title = PROJECT_NAME + ' | Login'
    }, [])

    return (
        <div className='auth-page'>
            <div className='title'>Sign In</div>
            <div className="sub-title">Enter your email and password to sign in!</div>
            <div className="line"></div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CommonInput
                    name="sEmail"
                    label="Email"
                    control={control}
                    type="text"
                    required
                    placeholder="Enter your email"
                    rules={FORM_VALIDATION?.sEmail}
                />

                <CommonInput
                    name="password"
                    type="password"
                    label="Password"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    required
                    control={control}
                    maxLength={25}
                    rules={{
                        required: {
                            value: true,
                            message: "* Please enter your password"
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
                    }}
                />

                <Button type="submit" className='submit-button'>
                    Sign In {isLoading && <CircularProgress className='mx-2' size="14px" color='var(--white-color)' />}
                </Button>

                <div className='password-remember-link auth-switch-link'>
                    Need an account? <Link to={paths.public.auth.signup}>Sign Up</Link>
                </div>
            </form>
        </div>
    )
}

export default Login
