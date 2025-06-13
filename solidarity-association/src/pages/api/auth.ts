import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'clave_super_secreta';

type User = {
    username: string;
};

type ResponseData =
    | { user: { username: string; token: string } }
    | { message: string };

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método no permitido' });
    }

    const { username, password } = req.body;

    const validUser = {
        username: 'admin',
        password: '1234',
    };

    if (username === validUser.username && password === validUser.password) {
        const payload: User = { username };
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '6h' });

        return res.status(200).json({
        user: {
            username,
            token,
        },
        });
    } else {
        return res.status(401).json({ message: 'Credenciales inválidas' });
    }
}
