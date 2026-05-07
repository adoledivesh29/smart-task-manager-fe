import { useQuery, useMutation, useQueryClient } from 'react-query';
import { API_KEYS } from '../../../Common/Constant/API_KEYS';
import { getTasks, getTasksMetadata, createTask, toggleTask, deleteTask } from '../Query/task.query';
import { CustomToast } from '../../../Utils/utils';

export const useGetTasks = () => {
    const { data, isLoading, isError, refetch } = useQuery([API_KEYS.GET_TASKS], () => getTasks(), {
        select: (data) => data.data.data,
        onError: (error) => {
            CustomToast(error?.response?.data?.message || error?.message, 'error');
        }
    });

    return { isLoading, isError, data, refetch };
}

export const useGetTasksMetadata = () => {
    const { data, isLoading, isError, refetch } = useQuery([API_KEYS.GET_TASKS_METADATA], () => getTasksMetadata(), {
        select: (response) => response?.data?.data ?? response?.data ?? {},
        onError: (error) => {
            CustomToast(error?.response?.data?.message || error?.message, 'error');
        }
    });

    return { isLoading, isError, data, refetch };
}

export const useCreateTask = () => {
    const queryClient = useQueryClient();
    return useMutation(createTask, {
        onSuccess: (data) => {
            CustomToast(data?.data?.message || 'Task created successfully', 'success');
            queryClient.invalidateQueries([API_KEYS.GET_TASKS]);
            queryClient.invalidateQueries([API_KEYS.GET_TASKS_METADATA]);
        },
        onError: (error) => {
            CustomToast(error?.response?.data?.message || error?.message, 'error');
        }
    });
}

export const useToggleTask = () => {
    const queryClient = useQueryClient();
    return useMutation(toggleTask, {
        onSuccess: (data) => {
            CustomToast(data?.data?.message || 'Task updated', 'success');
            queryClient.invalidateQueries([API_KEYS.GET_TASKS]);
            queryClient.invalidateQueries([API_KEYS.GET_TASKS_METADATA]);
        },
        onError: (error) => {
            CustomToast(error?.response?.data?.message || error?.message, 'error');
        }
    });
}

export const useDeleteTask = () => {
    const queryClient = useQueryClient();
    return useMutation(deleteTask, {
        onSuccess: (data) => {
            CustomToast(data?.data?.message || 'Task deleted', 'success');
            queryClient.invalidateQueries([API_KEYS.GET_TASKS]);
            queryClient.invalidateQueries([API_KEYS.GET_TASKS_METADATA]);
        },
        onError: (error) => {
            CustomToast(error?.response?.data?.message || error?.message, 'error');
        }
    });
}
