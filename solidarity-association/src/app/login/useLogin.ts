'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '../services/authService';

export function useLogin() {
    const [form, setForm] = useState({ username: '', password: '' });
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { ok, data } = await login(form);

        if (ok && data.success) {
            setMessage('Login exitoso');
            router.push('/');
        } else {
            setMessage(data.message || 'Error de autenticación');
        }
    };

    return { form, message, handleChange, handleSubmit };
}
