// services/authService.ts

type LoginCredentials = {
    username: string;
    password: string;
};

export async function login(credentials: LoginCredentials) {
    const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });

    const data = await res.json();

    return { ok: res.ok, data };
}
