/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense, useEffect } from 'react';
import { MutationCache, QueryClient, QueryClientProvider } from 'react-query';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './Assets/scss/main.scss';
import FallbackLoader from './Common/Components/FallbackLoader/FallbackLoader';
const AllRoutes = lazy(() => import('./Routes/index'))

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false,
            onSettled: (_d, e) => {
                if (e?.message === 'Network Error') {
                    queryClient.invalidateQueries('toast')
                    queryClient.setQueryData('message', () => ({ message: e?.message, type: 'error' }))
                }
                if (e?.response?.status > 300) {
                    queryClient.invalidateQueries('toast')
                    queryClient.setQueryData('message', () => ({
                        message: e?.response?.data.message || e?.response?.data || e?.message,
                        type: 'error'
                    }))
                }
            }
        },
        message: (msg, type) => {
            queryClient.invalidateQueries('toast')
            queryClient.setQueryData('message', () => ({ message: msg, type }))
        }
    },
    mutationCache: new MutationCache({
        onError: (e, query) => {
            if (!query?.disableToast)
                if (e?.message === 'Network Error') {
                    queryClient.defaultOptions.message(e?.message, 'error')
                } else if (e?.response?.status === 500) {
                    queryClient.defaultOptions.message(e?.message, 'warning')
                } else if (e?.response?.status > 300 && e?.response?.status < 500) {
                    queryClient.defaultOptions.message(e?.response?.data.message || e?.message, 'error')
                } else if (e?.response?.status <= 500) {
                    queryClient.defaultOptions.message(e?.response?.data.message || e?.message, 'warning')
                }
        }
    })
})

function App () {
    // Handle unhandled errors and uncaught errors
    useEffect(() => {
        window.onunhandledrejection = (ex, e) => {
            console.log('%c Unhandled Error:', 'color: orange; font-weight: bold; font-size: 18px;', ex, e)
        };

        window.onerror = (ex, e) => {
            console.log('%c Uncaught Error:', 'color: red; font-weight: bold; font-size: 18px;', ex, e)
        }
    }, [])
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Suspense fallback={<FallbackLoader />}>
                    <AllRoutes />
                </Suspense>
            </QueryClientProvider>
        </>
    )
}

export default App
