import { serialize } from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    
    if (req.method !== 'POST') return res.status(405).end();

    const { username, password } = req.body;

    // Simulación
    if (username === 'admin' && password === '1234') {
        const token = 'jwt_simulado_o_token'; // reemplazar con JWT real

        res.setHeader('Set-Cookie', serialize('authToken', token, {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60 * 24,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
        }));

        return res.status(200).json({ success: true });
    }

    return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
}
