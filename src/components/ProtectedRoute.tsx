import { Navigate } from 'react-router-dom';
import { useAuth } from '../app/AuthProvider';
import type {ReactNode} from 'react';

type Props = {
    children: ReactNode;
}

export default function ProtectedRoute({
        children,
    }: Props) {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>Loading...</p>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/" replace />;
    }

    return children;
}