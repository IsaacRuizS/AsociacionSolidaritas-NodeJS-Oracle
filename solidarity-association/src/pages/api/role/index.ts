import { runQuery } from '@/utils/dbConnection';
import oracledb from 'oracledb';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            return await getRole(req, res);
        case 'POST':
            return await postRole(req, res);
        case 'PATCH':
            return await patchRole(req, res);
        case 'DELETE':
            return await deleteRole(req, res);
        default:
            return res.status(405).json({ message: 'Método no permitido' });
    }
}

async function getRole(req: NextApiRequest, res: NextApiResponse) {
    try {
        const rows = await runQuery(
            `BEGIN
                :cursor := pkg_role_crud.get_roles();
            END;`,
            { cursor: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR } }
        );

        return res.status(200).json(rows);
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
}

async function postRole(req: NextApiRequest, res: NextApiResponse) {
    try {
        const r = req.body;

        await runQuery(
            `BEGIN
                pkg_role_crud.create_role(
                :P_NAME,
                :P_DESCRIPTION
                );
            END;`,
            {
                P_NAME: { val: r.name, type: oracledb.STRING },
                P_DESCRIPTION: { val: r.description, type: oracledb.STRING },
            }
        );

        return res.status(201).json({ message: 'Rol creado', data: r });
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
}

async function patchRole(req: NextApiRequest, res: NextApiResponse) {
    try {
        const r = req.body;

        await runQuery(
            `BEGIN
                pkg_role_crud.update_role(
                :P_ROLE_ID,
                :P_NAME,
                :P_DESCRIPTION
                );
            END;`,
            {
                P_ROLE_ID: { val: Number(r.roleId), type: oracledb.NUMBER },
                P_NAME: { val: r.name, type: oracledb.STRING },
                P_DESCRIPTION: { val: r.description, type: oracledb.STRING },
            }
        );

        return res.status(200).json({ message: 'Rol actualizado', data: r });
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
}

async function deleteRole(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { roleId } = req.body;

        if (!roleId) {
            return res.status(400).json({ error: 'roleId is required' });
        }

        await runQuery(
            `BEGIN
                pkg_role_crud.delete_role(:P_ROLE_ID);
            END;`,
            { P_ROLE_ID: { val: Number(roleId), type: oracledb.NUMBER } }
        );

        return res.status(200).json({ message: 'Rol eliminado', id: roleId });
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
}
