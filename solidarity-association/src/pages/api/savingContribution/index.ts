import { runQuery } from '@/utils/dbConnection';
import oracledb from 'oracledb';

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
        return await getSavingContribution(req, res);

        case 'POST':
        return await postSavingContribution(req, res);

        case 'PATCH':
        return await patchSavingContribution(req, res);

        case 'DELETE':
        return await deleteSavingContribution(req, res);

        default:
        return res.status(405).json({ message: 'Método no permitido' })
    }
}

async function getSavingContribution(req: NextApiRequest, res: NextApiResponse) {
    try {
        const rows = await runQuery(
        `BEGIN
            :cursor := PKG_SAVING_CONTRIBUTION.get_contributions();
        END;`,
        { cursor: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR } }
        );

        return res.status(200).json(rows);

    } catch (err: any) {

        return res.status(500).json({ error: err.message });
    }
}

async function postSavingContribution(req: NextApiRequest, res: NextApiResponse) {
    try {
        const nuevaContribucion = req.body;

        const result = await runQuery(
            `BEGIN
                PKG_SAVING_CONTRIBUTION.insert_contribution(:SAVING_ID, :AMOUNT, :DATE_SAVING_CONTRIBUTION);
            END;`,
            {
                SAVING_ID: { val: nuevaContribucion.savingId, type: oracledb.NUMBER },
                AMOUNT: { val: nuevaContribucion.amount, type: oracledb.NUMBER },
                DATE_SAVING_CONTRIBUTION: { val: new Date(nuevaContribucion.date), type: oracledb.DATE }
            }
        );

        return res.status(201).json({message: 'Aporte de ahorro creada', data: nuevaContribucion});
        
    } catch (err: any) {

        return res.status(500).json({ error: err.message });
    }
}

async function patchSavingContribution(req: NextApiRequest, res: NextApiResponse) {
    try {

        const contribucionActualizar = req.body;

        const result = await runQuery(
        `BEGIN
            PKG_SAVING_CONTRIBUTION.update_contribution(
            :CONTRIBUTION_ID,
            :SAVING_ID,
            :AMOUNT,
            :DATE_SAVING_CONTRIBUTION
            );
        END;`,
        {
            CONTRIBUTION_ID: { val: contribucionActualizar.contributionId, type: oracledb.NUMBER },
            SAVING_ID: { val: contribucionActualizar.savingId, type: oracledb.NUMBER },
            AMOUNT: { val: contribucionActualizar.amount, type: oracledb.NUMBER },
            DATE_SAVING_CONTRIBUTION: { val: new Date(contribucionActualizar.date), type: oracledb.DATE }
        }
        );

        return res.status(200).json({
            message: 'Aporte de ahorro actualizada',
            data: contribucionActualizar
        });

    } catch (err: any) {

        return res.status(500).json({ error: err.message });
    }
}

async function deleteSavingContribution(req: NextApiRequest, res: NextApiResponse) {
    try {

        const { contributionId } = req.body;

        if (!contributionId) {
            
            return res.status(400).json({ error: 'contributionId is required' });
        }   

        await runQuery(
                `BEGIN
                    PKG_SAVING_CONTRIBUTION.delete_contribution(:CONTRIBUTION_ID);
                END;`,
                {
                    CONTRIBUTION_ID: { val: contributionId, type: oracledb.NUMBER }
                }
            );

            return res.status(200).json({
                message: 'Aporte de ahorro eliminada',
                id: contributionId
            });
        
    } catch (err: any) {

        return res.status(500).json({ error: err.message });
    }
}
