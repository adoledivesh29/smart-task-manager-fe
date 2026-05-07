import { useEffect, useState } from 'react';
import { Button, CircularProgress, DialogActions } from '@mui/material';
import { useQueryClient } from 'react-query';
import CommonInput from '../../CommonInput/CommonInput';
import { API_KEYS } from '../../../Constant/API_KEYS';
import { FORM_VALIDATION } from '../../../Constant/validation';
import { useGetProfileQuery, useUpdateProfileMutation } from '../../../../Pages/Auth/Hooks/useAuthentication';

const getProfileValue = (profile, keys, fallback = '') => {
    for (const key of keys) {
        const value = profile?.[key];
        if (value !== undefined && value !== null && value !== '') return value;
    }

    return fallback;
};

const ProfileDetails = ({ setModal, control, handleSubmit, reset }) => {
    const queryClient = useQueryClient();
    const [isEditingName, setIsEditingName] = useState(false);
    const { data: profile = {}, isLoading } = useGetProfileQuery();
    const { mutate, isLoading: isUpdating } = useUpdateProfileMutation({
        onSuccess: () => {
            queryClient.invalidateQueries([API_KEYS.GET_PROFILE]);
            setIsEditingName(false);
        }
    });

    const userName = getProfileValue(profile, ['sUserName', 'userName', 'username', 'name']);
    const email = getProfileValue(profile, ['sEmail', 'email']);

    useEffect(() => {
        reset({
            sUserName: userName,
            sEmail: email
        });
    }, [userName, email, reset]);

    const onSubmit = (data) => {
        mutate({ sUserName: data?.sUserName?.trim() || '' });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="profile-details-form">
            <div className="profile-summary-card">
                <div className="profile-summary-card__avatar">
                    {(userName || email || 'A').charAt(0).toUpperCase()}
                </div>
                <div>
                    <h3>{userName || 'User'}</h3>
                    <p>{email || 'No email available'}</p>
                </div>
            </div>

            {isLoading ? (
                <div className="profile-loading-state">
                    <CircularProgress size={22} />
                    <span>Loading profile details...</span>
                </div>
            ) : (
                <div className="row">
                    <div className="col-md-12">
                        <div className="profile-field-header">
                            <span>Username</span>
                            <button
                                type="button"
                                className="profile-edit-trigger"
                                onClick={() => setIsEditingName((prev) => !prev)}
                            >
                                {isEditingName ? 'Cancel' : 'Edit'}
                            </button>
                        </div>
                        <CommonInput
                            name="sUserName"
                            label="Username"
                            control={control}
                            type="text"
                            required
                            disabled={!isEditingName || isUpdating}
                            placeholder="Enter your username"
                            rules={FORM_VALIDATION?.sUserName}
                        />
                    </div>

                    <div className="col-md-12">
                        <CommonInput
                            name="sEmail"
                            label="Email"
                            control={control}
                            type="text"
                            disabled
                            placeholder="Email address"
                        />
                    </div>
                </div>
            )}

            <DialogActions className='d-flex justify-content-end align-items-center gap-2 pb-1'>
                <Button
                    autoFocus
                    type="button"
                    onClick={() => {
                        setModal({ open: false, type: null });
                        setIsEditingName(false);
                        reset({ sUserName: userName, sEmail: email });
                    }}
                    className='btn-custom-action btn-custom-discard'
                    disabled={isUpdating}
                >
                    Close
                </Button>
                <Button
                    autoFocus
                    type='submit'
                    className='btn-custom-action btn-custom-confirm d-flex align-items-center gap-2'
                    disabled={!isEditingName || isLoading || isUpdating}
                >
                    Save Changes {isUpdating && <CircularProgress size={15} />}
                </Button>
            </DialogActions>
        </form>
    );
};

export default ProfileDetails;
