import { runQuery } from '@/utils/dbConnection';
import oracledb from 'oracledb';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            return await getCreditStatus(req, res);
        case 'POST':
            return await postCreditStatus(req, res);
        case 'PATCH':
            return await patchCreditStatus(req, res);
        case 'DELETE':
            return await deleteCreditStatus(req, res);
        default:
            return res.status(405).json({ message: 'Método no permitido' });
    }
}

async function getCreditStatus(req: NextApiRequest, res: NextApiResponse) {
    try {
        const rows = await runQuery(
            `BEGIN
            :cursor := pkg_credit_status_crud.get_credit_statuses();
        END;`,
            { cursor: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR } }
        );
        return res.status(200).json(rows);
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
}

async function postCreditStatus(req: NextApiRequest, res: NextApiResponse) {
    try {
        const cs = req.body;

        await runQuery(
            `BEGIN
                pkg_credit_status_crud.create_credit_status(:P_DESCRIPTION);
            END;`,
            {
                P_DESCRIPTION: { val: cs.description, type: oracledb.STRING },
            }
        );

        return res.status(201).json({ message: 'Estado de crédito creado', data: cs });
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
}

async function patchCreditStatus(req: NextApiRequest, res: NextApiResponse) {
    try {
        const cs = req.body;

        await runQuery(
            `BEGIN
                pkg_credit_status_crud.update_credit_status(
                :P_STATUS_ID,
                :P_DESCRIPTION
                );
            END;`,
            {
                P_STATUS_ID: { val: Number(cs.statusId), type: oracledb.NUMBER },
                P_DESCRIPTION: { val: cs.description, type: oracledb.STRING },
            }
        );

        return res.status(200).json({ message: 'Estado de crédito actualizado', data: cs });
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
}

async function deleteCreditStatus(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { statusId } = req.body;

        if (!statusId) {
            return res.status(400).json({ error: 'statusId is required' });
        }

        await runQuery(
            `BEGIN
                pkg_credit_status_crud.delete_credit_status(:P_STATUS_ID);
            END;`,
            { P_STATUS_ID: { val: Number(statusId), type: oracledb.NUMBER } }
        );

        return res.status(200).json({ message: 'Estado de crédito eliminado', id: statusId });
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
}
