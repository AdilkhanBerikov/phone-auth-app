import { useState } from 'react';
import type { FormEvent } from 'react';

type Props = {
    onVerify: (code: string) => Promise<void>;
};

export default function CodeForm({ onVerify }: Props) {
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (code.length !== 6) {
            alert('Enter 6 digit code');
            return
        }

        setLoading(true);

        try {
            await onVerify(code);
        } catch {
            alert('Invalid code');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                className="w-full p-3 border rounded-lg"
                type="text"
                placeholder="Enter code"
                value={code}
                maxLength={6}
                inputMode="numeric"
                onChange={e => setCode(e.target.value)}
            />

            <button type="submit" disabled={loading} className="w-full p-3 bg-green-600 text-white rounded-lg">
                {loading ? 'Verifying...' : 'Verify'}
            </button>
        </form>
    );
}