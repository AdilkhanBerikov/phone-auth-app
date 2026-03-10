import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';

type Props = {
    onSend: (phone: string) => Promise<void>;
};

export default function PhoneForm({ onSend }: Props) {
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(0);

    const phoneRegex = /^\+\d{10,15}$/;

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!phoneRegex.test(phone)) {
            alert('Invalid phone number');
            return;
        }

        setLoading(true);

        try {
            await onSend(phone);
            setTimer(60);
        } catch (err) {
            alert('Failed to send code');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (timer === 0) return;

        const interval = setInterval(() => {
            setTimer(prev => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                className="w-full p-3 border rounded-lg"
                type="tel"
                placeholder="+77001234567"
                value={phone}
                onChange={e => setPhone(e.target.value)}
            />

            <button type="submit" disabled={loading || timer > 0} className="w-full p-3 bg-blue-600 text-white rounded-lg">
                {loading ? 'Sending...' : 'Send code'}
            </button>

            {timer > 0 && (<p className="text-sm text-gray-500">Resend in {timer}s</p>)}

        </form>
    );
}