'use client';

// Update the import path below if the actual path is different
import Login from '../features/login/login';

export default function LoginPage() {
    return (
        <main style={{ display: 'flex', justifyContent: 'center', paddingTop: '80px' }}>
            <Login />
        </main>
    );
}
