import { runQuery } from '@/utils/dbConnection';
import oracledb from 'oracledb';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            return await getSavingType(req, res);
        case 'POST':
            return await postSavingType(req, res);
        case 'PATCH':
            return await patchSavingType(req, res);
        case 'DELETE':
            return await deleteSavingType(req, res);
        default:
            return res.status(405).json({ message: 'Método no permitido' });
    }
}

async function getSavingType(req: NextApiRequest, res: NextApiResponse) {
    try {
        const rows = await runQuery(
            `BEGIN
                :cursor := pkg_saving_type_crud.get_saving_types();
            END;`,
            { cursor: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR } }
        );

        return res.status(200).json(rows);
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
}

async function postSavingType(req: NextApiRequest, res: NextApiResponse) {
    try {
        const t = req.body;

        await runQuery(
            `BEGIN
                pkg_saving_type_crud.create_saving_type(
                :P_NAME,
                :P_DESCRIPTION
                );
            END;`,
            {
                P_NAME: { val: t.name, type: oracledb.STRING },
                P_DESCRIPTION: { val: t.description, type: oracledb.STRING },
            }
        );

        return res.status(201).json({ message: 'Tipo de ahorro creado', data: t });
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
}

async function patchSavingType(req: NextApiRequest, res: NextApiResponse) {
    try {
        const t = req.body;

        await runQuery(
            `BEGIN
                pkg_saving_type_crud.update_saving_type(
                :P_SAVING_TYPE_ID,
                :P_NAME,
                :P_DESCRIPTION
                );
            END;`,
            {
                P_SAVING_TYPE_ID: { val: Number(t.savingTypeId), type: oracledb.NUMBER },
                P_NAME: { val: t.name, type: oracledb.STRING },
                P_DESCRIPTION: { val: t.description, type: oracledb.STRING },
            }
        );

        return res.status(200).json({ message: 'Tipo de ahorro actualizado', data: t });
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
}

async function deleteSavingType(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { typeId } = req.body;

        if (!typeId) {
            return res.status(400).json({ error: 'typeId is required' });
        }

        await runQuery(
            `BEGIN
                pkg_saving_type_crud.delete_saving_type(:P_SAVING_TYPE_ID);
            END;`,
            { P_SAVING_TYPE_ID: { val: Number(typeId), type: oracledb.NUMBER } }
        );

        return res.status(200).json({ message: 'Tipo de ahorro eliminado', id: typeId });
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
}
