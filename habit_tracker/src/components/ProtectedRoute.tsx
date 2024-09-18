import React from 'react';

import { Navigate } from 'react-router-dom';

import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Box, CircularProgress } from '@mui/material';

interface ProtectedRouteProps {
    element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
    const [user, loading] = useAuthState(auth);

    if (loading) {
        return <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
        </Box>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return element;
};

export default ProtectedRoute;