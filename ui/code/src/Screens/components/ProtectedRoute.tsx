import React, { JSX, ReactElement, useContext } from 'react';
import { AuthContext } from '../store/AuthContext';
import { useNavigate,Navigate } from 'react-router-dom';

type Props = {
    children: React.ReactNode
}

function ProtectedRoute({children}:Props) {
    const {userDetails} = useContext(AuthContext);
    const navigate = useNavigate();

    if (!userDetails?.username) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute