import axios from 'axios';
import useAuth from './useAuth';
import useRefreshToken from './useRefreshToken';
import { useEffect } from 'react';

const useAxios = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();
    const instance = axios.create({
        baseURL: 'http://localhost:8000',
        timeout: 3000, // Adjust the timeout as needed
    });

    useEffect(() => {
        const requestIntercecept = instance.interceptors.request.use(
            (config) => {
                const token = auth?.access_token;

                // If a token is available, set it in the Authorization header
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }

                return config;
            },
            (error) => {
                return Promise.reject(error);
            },
        );

        const responseIntercept = instance.interceptors.response.use(
            (response) => response,

            async (error) => {
                const prevRequest = error?.config;

                if (
                    error?.response?.data &&
                    error.response.data.message === 'Access Denied As You are not Admin.' &&
                    !prevRequest?.sent
                ) {
                    console.log('Token expired!!');
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return instance(prevRequest);
                }
                return Promise.reject(error);
            },
        );

        return () => {
            instance.interceptors.request.eject(requestIntercecept);
            instance.interceptors.response.eject(responseIntercept);
        };
    }, [auth, refresh, instance]);

    return instance;
};

export default useAxios;
