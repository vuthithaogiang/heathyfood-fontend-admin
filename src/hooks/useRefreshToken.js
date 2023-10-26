import axios from 'axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();
    const { auth } = useAuth();
    const http = axios.create({
        baseURL: 'http://localhost:8000',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth?.access_token}`,
        },
        withCredentials: true,
    });

    const refresh = async () => {
        try {
            const response = await http.post('/api/auth/refresh');

            console.log('REFRESH TOKEN: ', response.data);
            setAuth({
                access_token: response.data.access_token,
                role: 'USER',
            });
        } catch (error) {
            console.log(error);

            if (error?.response?.data?.message === 'Access Denied As You are not Admin.') {
                setAuth({});
            }

            setAuth({});
        }
    };

    return refresh;
};

export default useRefreshToken;
