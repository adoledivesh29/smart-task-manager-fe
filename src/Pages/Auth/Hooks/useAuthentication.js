import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { checkToken, doLogin, doRegister, doResetPassword } from '../Query/auth.mutation';
import { getProfile, logoutProfile, updateProfile } from '../Query/auth.query';
import { removeAllCookies, setCookie } from '../../../Utils/helper';
import paths from '../../../Routes/paths';
import { CustomToast } from '../../../Utils/utils';
import { API_KEYS } from '../../../Common/Constant/API_KEYS';

// Login
export const useLoginMutation = (reset) => {
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(doLogin, {
    onSuccess: (response) => {
      if (response?.headers?.authorization) {
        CustomToast('Login Successfully');
        setCookie(import.meta.env.VITE_STORAGE_KEY, response.headers.authorization, 9 / 24);
        navigate(paths.private.dashboard);
      }
    },
    onError: (error) => {
      CustomToast(error?.response?.data?.message || error?.message, 'error');
      reset({
        sEmail: '',
        sPassword: ''
      });
    }
  });

  return { mutate, isLoading };
}

// Register
export const useRegisterMutation = (reset) => {
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(doRegister, {
    onSuccess: (response) => {
      CustomToast(response?.data?.message || 'Account created successfully');
      reset({
        sUserName: '',
        sEmail: '',
        sPassword: '',
        sConfirmPassword: ''
      });
      navigate(paths.public.auth.login);
    },
    onError: (error) => {
      CustomToast(error?.response?.data?.message || error?.message, 'error');
    }
  });

  return { mutate, isLoading };
}

// Profile
export const useGetProfileQuery = () => {
  const { data, isLoading, isError, refetch } = useQuery([API_KEYS.GET_PROFILE], () => getProfile(), {
    select: (response) => response?.data?.data ?? response?.data ?? {},
  });

  return { data, isLoading, isError, refetch };
}

export const useUpdateProfileMutation = ({ onSuccess } = {}) => {
  const { mutate, isLoading } = useMutation(updateProfile, {
    onSuccess: (response) => {
      CustomToast(response?.data?.message || 'Profile updated successfully');
      if (onSuccess) onSuccess(response);
    },
    onError: (error) => {
      CustomToast(error?.response?.data?.message || error?.message, 'error');
    }
  });

  return { mutate, isLoading };
}

export const useLogoutMutation = () => {
  const { mutate, isLoading } = useMutation(logoutProfile, {
    onSuccess: (response) => {
      CustomToast(response?.data?.message || 'Logged out successfully');
      removeAllCookies();
      window.location.href = paths.public.auth.login;
    },
    onError: (error) => {
      CustomToast(error?.response?.data?.message || error?.message, 'error');
    }
  });

  return { mutate, isLoading };
}

// Check Token
export const useCheckTokenMutation = ({ setTokenWrong, token }) => {
  const { isLoading } = useQuery([API_KEYS.CHECK_TOKEN], () => checkToken(token), {
    onError: () => {
      CustomToast('Token expired', 'error')
      setTokenWrong(true)
    },
  })
  return { isLoading }
}

// Reset Password
export const useResetPasswordMutation = ({ reset }) => {
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(doResetPassword, {
    onSuccess: (response) => {
      CustomToast(response?.data?.message);
      reset({
        sNewPassword: '',
        sConfirmPassword: ''
      });
      navigate(paths.public.auth.login);
    },
    onError: (error) => {
      CustomToast(error?.response?.data?.message || error?.message, 'error');
      reset({
        sNewPassword: '',
        sConfirmPassword: ''
      });
    }
  });

  return { mutate, isLoading };
}
