import { runQuery } from '@/utils/dbConnection';
import oracledb from 'oracledb';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            return await getLaborCondition(req, res);
        case 'POST':
            return await postLaborCondition(req, res);
        case 'PATCH':
            return await patchLaborCondition(req, res);
        case 'DELETE':
            return await deleteLaborCondition(req, res);
        default:
            return res.status(405).json({ message: 'Método no permitido' });
    }
}

async function getLaborCondition(req: NextApiRequest, res: NextApiResponse) {
    try {
        const rows = await runQuery(
            `BEGIN
            :cursor := pkg_labor_condition_crud.get_labor_conditions();
        END;`,
            { cursor: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR } }
        );

        return res.status(200).json(rows);
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
}

async function postLaborCondition(req: NextApiRequest, res: NextApiResponse) {
    try {
        const lc = req.body;

        await runQuery(
            `BEGIN
                pkg_labor_condition_crud.create_labor_condition(
                :P_DESCRIPTION
                );
            END;`,
            {
                P_DESCRIPTION: { val: lc.description, type: oracledb.STRING },
            }
        );

        return res.status(201).json({ message: 'Condición laboral creada', data: lc });
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
}

async function patchLaborCondition(req: NextApiRequest, res: NextApiResponse) {
    try {
        const lc = req.body;

        await runQuery(
            `BEGIN
                pkg_labor_condition_crud.update_labor_condition(
                :P_CONDITION_ID,
                :P_DESCRIPTION
                );
            END;`,
            {
                P_CONDITION_ID: { val: Number(lc.conditionId), type: oracledb.NUMBER },
                P_DESCRIPTION: { val: lc.description, type: oracledb.STRING },
            }
        );

        return res.status(200).json({ message: 'Condición laboral actualizada', data: lc });
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
}

async function deleteLaborCondition(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { conditionId } = req.body;

        if (!conditionId) {
            return res.status(400).json({ error: 'conditionId is required' });
        }

        await runQuery(
            `BEGIN
                pkg_labor_condition_crud.delete_labor_condition(:P_CONDITION_ID);
            END;`,
            { P_CONDITION_ID: { val: Number(conditionId), type: oracledb.NUMBER } }
        );

        return res.status(200).json({ message: 'Condición laboral eliminada', id: conditionId });
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
}
