import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '~/hooks/useAuth';

const RequireAuth = ({ allowdRole }) => {
    const { auth } = useAuth();

    const location = useLocation();

    return auth?.role === allowdRole ? (
        <Outlet />
    ) : auth?.acccess_token ? (
        <Navigate to="/unauthorize" state={{ from: location }} replace></Navigate>
    ) : (
        <Navigate to="/login" state={{ from: location }} replace></Navigate>
    );
};

export default RequireAuth;
