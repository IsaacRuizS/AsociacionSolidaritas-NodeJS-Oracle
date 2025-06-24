'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function useLogin() {

    const [form, setForm] = useState({ username: '', password: '' });
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        const res = await fetch('/api/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });

        const data = await res.json();

        if (res.ok && data.success) {
            
            setMessage('Login exitoso');
            router.push('/');

        } else {
            setMessage(data.message || 'Error de autenticación');
        }
    };

    return { form, message, handleChange, handleSubmit };
}
