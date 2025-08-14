import { runQuery } from '@/utils/dbConnection';
import { toOracleJsDate } from '@/utils/helper';
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
            return res.status(405).json({ message: 'Método no permitido' });
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
        const w = req.body;
        
        await runQuery(
            `BEGIN
                PKG_WITHDRAWAL.insert_withdrawal(
                :P_SAVING_ID,
                :P_AMOUNT,
                :P_DATE_WITHDRAWAL
                );
            END;`,
            {
                P_SAVING_ID: { val: Number(w.savingId), type: oracledb.NUMBER },
                P_AMOUNT: { val: Number(w.amount), type: oracledb.NUMBER },
                P_DATE_WITHDRAWAL: { val: toOracleJsDate(w.date), type: oracledb.DATE }
            }
        );

        return res.status(201).json({ message: 'Retiro creado', data: w });
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
}

async function patchWithdrawal(req: NextApiRequest, res: NextApiResponse) {
    try {
        const w = req.body;

        console.log(w);


        await runQuery(
            `BEGIN
                PKG_WITHDRAWAL.update_withdrawal(
                :P_WITHDRAWAL_ID,
                :P_SAVING_ID,
                :P_AMOUNT,
                :P_DATE_WITHDRAWAL
                );
            END;`,
            {
                P_WITHDRAWAL_ID: { val: Number(w.withdrawalId), type: oracledb.NUMBER },
                P_SAVING_ID: { val: Number(w.savingId), type: oracledb.NUMBER },
                P_AMOUNT: { val: Number(w.amount), type: oracledb.NUMBER },
                P_DATE_WITHDRAWAL: { val: toOracleJsDate(w.date), type: oracledb.DATE }
            }
        );

        return res.status(200).json({ message: 'Retiro actualizado', data: w });
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
                PKG_WITHDRAWAL.delete_withdrawal(:P_WITHDRAWAL_ID);
            END;`,
            { P_WITHDRAWAL_ID: { val: Number(withdrawalId), type: oracledb.NUMBER } }
        );

        return res.status(200).json({ message: 'Retiro eliminado', id: withdrawalId });
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
}
