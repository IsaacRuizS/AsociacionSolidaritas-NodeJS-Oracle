'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Login() {
    const [form, setForm] = useState({ username: '', password: '' });
    const [message, setMessage] = useState('');

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

        if (res.ok && data.user) {
            // Guardar en localStorage
            localStorage.setItem('user', JSON.stringify(data.user));
            setMessage('Login exitoso');

        } else {
            setMessage(data.message || 'Error de autenticación');
        }
    };


    return (
        <div className="flex justify-center items-center">
            <div className="w-full max-w-xl bg-white p-6 rounded-2xl" style={{  boxShadow: '0 0 10px rgba(0,0,0,0.1)', width: '400px' }}>
                {/* Logo */}
                <div className="mb-6 flex justify-center">
                    <Image
                        src="/logo.png"
                        alt="Asobank logo"
                        width={140}
                        height={40}
                    />
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4 text-left">
                        <label className="block mb-1 font-medium">Nombre de Usuario</label>
                        <input
                            name="username"
                            type="text"
                            value={form.username}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className="mb-6 text-left">
                        <label className="block mb-1 font-medium">Contraseña</label>
                        <input
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#284B97] text-white py-3 rounded-lg hover:bg-blue-800 transition"
                    >
                        Ingresar
                    </button>
                </form>

                {message && (
                    <p className="mt-4 text-center text-gray-700">{message}</p>
                )}
            </div>
        </div>
    );
}
