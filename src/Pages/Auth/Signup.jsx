import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import CommonInput from '../../Common/Components/CommonInput/CommonInput';
import { FORM_VALIDATION } from '../../Common/Constant/validation';
import { PROJECT_NAME, REGEX } from '../../Common/Constant';
import paths from '../../Routes/paths';
import { useRegisterMutation } from './Hooks/useAuthentication';

const passwordRules = {
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
        value: REGEX.PASSWORD,
        message: "* Password must include uppercase, lowercase, number & special character.",
    },
}

const Signup = () => {
    const { control, handleSubmit, reset, watch } = useForm({ mode: 'all' });
    const { mutate, isLoading } = useRegisterMutation(reset);

    const onSubmit = (data) => {
        mutate({
            sUserName: data.sUserName,
            sEmail: data.sEmail,
            sPassword: data.sPassword
        });
    };

    useEffect(() => {
        document.title = `${PROJECT_NAME} | Sign Up`;
    }, []);

    return (
        <div className='auth-page'>
            <div className='title'>Create Account</div>
            <div className="sub-title">Set up your Smart Task Manager account and start organizing your work.</div>
            <div className="line"></div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <CommonInput
                    name="sUserName"
                    label="Username"
                    control={control}
                    type="text"
                    required
                    placeholder="Enter your username"
                    rules={FORM_VALIDATION?.sUserName}
                />

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
                    name="sPassword"
                    type="password"
                    label="Password"
                    autoComplete="new-password"
                    placeholder="Create a password"
                    required
                    control={control}
                    maxLength={25}
                    rules={passwordRules}
                />

                <CommonInput
                    name="sConfirmPassword"
                    type="password"
                    label="Confirm Password"
                    autoComplete="new-password"
                    placeholder="Confirm your password"
                    required
                    control={control}
                    maxLength={25}
                    rules={{
                        ...passwordRules,
                        validate: (value) => value === watch('sPassword') || '* Confirm Password must match Password',
                    }}
                />

                <Button type="submit" className='submit-button' disabled={isLoading}>
                    Sign Up {isLoading && <CircularProgress className='mx-2' size="14px" color='var(--white-color)' />}
                </Button>

                <div className='password-remember-link auth-switch-link'>
                    Already have an account? <Link to={paths.public.auth.login}>Sign In</Link>
                </div>
            </form>
        </div>
    );
};

export default Signup;
