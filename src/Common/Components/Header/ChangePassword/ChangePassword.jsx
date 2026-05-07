import CommonInput from '../../CommonInput/CommonInput';
import { Button, CircularProgress, DialogActions } from '@mui/material';
import { useMutation } from 'react-query';
import axios from '../../../../axios';
import { CustomToast } from '../../../../Utils/utils';
import { removeAllCookies } from '../../../../Utils/helper';

const ChangePassword = ({ setModal, control, handleSubmit, getValues, reset }) => {
    const { mutate, isLoading } = useMutation(
        (payload) => axios.post('/profile/change/password', payload),
        {
            onSuccess: () => {
                CustomToast('Password Updated Successfully');
                removeAllCookies();
                window.location.href = '/login';
            },
            onError: (err) => {
                CustomToast(err?.response?.data?.message || err?.message, 'error');
            }
        }
    )

    const onSubmit = (data) => {
        mutate({
            currentPassword: data?.sPassword || '',
            newPassword: data?.sNewPassword || '',
        })
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
                <div className="col-md-6">
                    <CommonInput
                        name="sPassword"
                        type="password"
                        label="Current Password"
                        placeholder="Enter your current password"
                        required
                        control={control}
                        maxLength={25}
                        rules={{
                            required: {
                                value: true,
                                message: "* Please enter your current password"
                            },
                            minLength: {
                                value: 8,
                                message: "* Current Password must be at least 8 characters",
                            },
                            maxLength: {
                                value: 25,
                                message: "* Current Password must not exceed 25 characters",
                            },
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.,;'\[\]{}!#$%^&*()_+=\-|:;"<>?/\\]).{8,25}$/,
                                message: "* Current Password must include uppercase, lowercase, number & special character.",
                            },
                        }}
                    />
                </div>
                <div className="col-md-6">
                    <CommonInput
                        name="sNewPassword"
                        type="password"
                        label="New Password"
                        placeholder="Enter your new password"
                        required
                        control={control}
                        rules={{
                            required: {
                                value: true,
                                message: "* Please enter your new password"
                            },
                            minLength: {
                                value: 8,
                                message: "* New Password must be at least 8 characters",
                            },
                            maxLength: {
                                value: 20,
                                message: "* New Password must not exceed 20 characters",
                            },
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.,;'\[\]{}!#$%^&*()_+=\-|:;"<>?/\\]).{8,}$/,
                                message: "* New Password must include uppercase, lowercase, number & special character.",
                            },
                            validate: value =>
                                value !== getValues('sPassword') || '* New Password must be different from Current Password',
                        }}
                    />
                </div>
                <div className="col-md-6">
                    <CommonInput
                        name="sConfirmPassword"
                        type="password"
                        label="Confirm Password"
                        placeholder="Enter your confirm password"
                        required
                        control={control}
                        rules={{
                            required: {
                                value: true,
                                message: "* Please enter your confirm password"
                            },
                            minLength: {
                                value: 8,
                                message: "* Confirm Password must be at least 8 characters",
                            },
                            maxLength: {
                                value: 20,
                                message: "* Confirm Password must not exceed 20 characters",
                            },
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.,;'\[\]{}!#$%^&*()_+=\-|:;"<>?/\\]).{8,}$/,
                                message: "* Confirm Password must include uppercase, lowercase, number & special character.",
                            },
                            validate: value =>
                                value === getValues('sNewPassword') || '* Confirm Password must match New Password',
                        }}
                    />
                </div>

                <DialogActions className='d-flex justify-content-end align-items-center gap-2 pb-1'>
                    <Button autoFocus onClick={() => {
                        setModal({ open: false, type: null })
                        reset()
                    }} className='btn-custom-action btn-custom-discard'>
                        Discard
                    </Button>
                    <Button autoFocus type='submit' className='btn-custom-action btn-custom-confirm d-flex align-items-center gap-2'>
                        Change Password {isLoading && <CircularProgress size={15} />}
                    </Button>
                </DialogActions>
            </div>
        </form>
    )
}

export default ChangePassword
