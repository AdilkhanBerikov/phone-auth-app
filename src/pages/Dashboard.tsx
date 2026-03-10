import { logout } from '../services/authService';
import { useAuth } from '../app/AuthProvider';
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">

            <div className="bg-white p-8 rounded-xl shadow">

                <h1 className="text-xl font-bold mb-4">
                    You are logged in
                </h1>

                <p className="mb-4">
                    Phone: {user?.phoneNumber}
                </p>

                <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-500 transition duration-150 ease-in-out">
                    Logout
                </button>

            </div>

        </div>
    );
}