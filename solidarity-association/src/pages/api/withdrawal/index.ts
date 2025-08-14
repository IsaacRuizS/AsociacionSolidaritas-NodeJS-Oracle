import { runQuery } from '@/utils/dbConnection';
import oracledb from 'oracledb';

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
        return await getWithdrawal(req, res);

        case 'POST':
        return await postWithdrawal(req, res);

        case 'PATCH':
        return await patchWithdrawal(req, res);

        case 'DELETE':
        return await deleteWithdrawal(req, res);

        default:
        return res.status(405).json({ message: 'Método no permitido' })
    }
}

async function getWithdrawal(req: NextApiRequest, res: NextApiResponse) {
    try {
        const rows = await runQuery(
        `BEGIN
            :cursor := PKG_WITHDRAWAL.get_withdrawals();
        END;`,
        { cursor: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR } }
        );

        return res.status(200).json(rows);

    } catch (err: any) {

        return res.status(500).json({ error: err.message });
    }
}

async function postWithdrawal(req: NextApiRequest, res: NextApiResponse) {
    try {
        const nuevoRetiro = req.body;

        const result = await runQuery(
            `BEGIN
                PKG_WITHDRAWAL.insert_withdrawal(:SAVING_ID, :AMOUNT, :DATE_WITHDRAWAL);
            END;`,
            {
                SAVING_ID: { val: nuevoRetiro.savingId, type: oracledb.NUMBER },
                AMOUNT: { val: nuevoRetiro.amount, type: oracledb.NUMBER },
                DATE_WITHDRAWAL: { val: new Date(nuevoRetiro.dateWithdrawal), type: oracledb.DATE }
            }
        );

        return res.status(201).json({message: 'Retiro creado', data: nuevoRetiro});
        
    } catch (err: any) {

        return res.status(500).json({ error: err.message });
    }
}

async function patchWithdrawal(req: NextApiRequest, res: NextApiResponse) {
    try {

        const retiroActualizar = req.body;

        const result = await runQuery(
        `BEGIN
            PKG_WITHDRAWAL.update_withdrawal(
            :WITHDRAWAL_ID,
            :SAVING_ID,
            :AMOUNT,
            :DATE_WITHDRAWAL
            );
        END;`,
        {
            WITHDRAWAL_ID: { val: retiroActualizar.withdrawalId, type: oracledb.NUMBER },
            SAVING_ID: { val: retiroActualizar.savingId, type: oracledb.NUMBER },
            AMOUNT: { val: retiroActualizar.amount, type: oracledb.NUMBER },
            DATE_WITHDRAWAL: { val: new Date(retiroActualizar.dateWithdrawal), type: oracledb.DATE }
        }
        );

        return res.status(200).json({
            message: 'Retiro actualizado',
            data: retiroActualizar
        });

    } catch (err: any) {

        return res.status(500).json({ error: err.message });
    }
}

async function deleteWithdrawal(req: NextApiRequest, res: NextApiResponse) {
    try {

        const { withdrawalId } = req.body;

        if (!withdrawalId) {
            
            return res.status(400).json({ error: 'withdrawalId is required' });
        }   

        await runQuery(
                `BEGIN
                    PKG_WITHDRAWAL.delete_withdrawal(:WITHDRAWAL_ID);
                END;`,
                {
                    WITHDRAWAL_ID: { val: withdrawalId, type: oracledb.NUMBER }
                }
            );

            return res.status(200).json({
                message: 'Retiro eliminado',
                id: withdrawalId
            });
        
    } catch (err: any) {

        return res.status(500).json({ error: err.message });
    }
}
