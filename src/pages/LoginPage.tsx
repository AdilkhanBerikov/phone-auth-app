import { useState, useEffect } from 'react';
import PhoneForm from '../components/PhoneForm';
import CodeForm from '../components/CodeForm';
import { sendPhoneCode, verifyCode } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../app/AuthProvider';

export default function LoginPage() {
    const [confirmationResult, setConfirmationResult] = useState<any>(null);
    const [error, setError] = useState('');

    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    const handleSend = async (phone: string) => {
        try {
            const result = await sendPhoneCode(phone);
            setConfirmationResult(result);
            setError('');
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleVerify = async (code: string) => {
        try {
            await verifyCode(confirmationResult, code);
            navigate('/dashboard');
        } catch (error: any) {
            setError(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm p-6 bg-white rounded-xl shadow-md">

                <h1 className="text-2xl font-bold mb-6 text-center">
                    Phone Login
                </h1>

                {!confirmationResult && (<PhoneForm onSend={handleSend}/>)}

                {confirmationResult && (<CodeForm onVerify={handleVerify}/>)}

                {error && (<p className="text-red-500 mt-4 text-center">{error}</p>)}

                <div id="recaptcha-container"></div>

            </div>
        </div>
    );
}