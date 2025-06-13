import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default function HomePage() {
    const cookieStore = cookies();
    //const token = cookieStore.get('authToken');

    if (true) {
        // No autenticado, redirige a login
        redirect('/login');
    }

    // Autenticado, muestra la pantalla principal
    return (
        <main style={{ padding: '2rem' }}>
        <h1>Bienvenido al Dashboard</h1>
        <p>Esta es tu pantalla principal.</p>
        </main>
    );
}
