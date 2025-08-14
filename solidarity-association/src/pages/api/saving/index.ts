import { runQuery } from '@/utils/dbConnection';
import { toOracleJsDate } from '@/utils/helper';
import oracledb from 'oracledb';

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            return await getSaving(req, res);

        case 'POST':
            return await postSaving(req, res);

        case 'PATCH':
            return await patchSaving(req, res);

        case 'DELETE':
            return await deleteSaving(req, res);

        default:
            return res.status(405).json({ message: 'Método no permitido' })
    }
}

async function getSaving(req: NextApiRequest, res: NextApiResponse) {
    try {
        const rows = await runQuery(
            `BEGIN
                :cursor := pkg_saving_crud.get_savings();
            END;`,
            { cursor: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR } }
        );

        return res.status(200).json(rows);
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
}

async function postSaving(req: NextApiRequest, res: NextApiResponse) {
    try {
        const s = req.body;

        await runQuery(
            `BEGIN
            pkg_saving_crud.create_saving(
                :P_ASSOCIATE_ID,
                :P_NAME,
                :P_CURRENT_BALANCE,
                :P_MONTHLY_AMOUNT,
                :P_INTEREST_RATE,
                :P_DEADLINE,
                :P_GENERATED_INTEREST,
                :P_SAVING_TYPE_ID

            );
            END;`,
            {
                P_ASSOCIATE_ID: { val: Number(s.associateId), type: oracledb.NUMBER },
                P_NAME: { val: s.name, type: oracledb.STRING },
                P_CURRENT_BALANCE: { val: Number(s.currentBalance), type: oracledb.NUMBER },
                P_MONTHLY_AMOUNT: { val: Number(s.monthlyAmount), type: oracledb.NUMBER },
                P_INTEREST_RATE: { val: Number(s.interestRate), type: oracledb.NUMBER },
                P_DEADLINE: { val: toOracleJsDate(s.deadline), type: oracledb.DATE },
                P_GENERATED_INTEREST: { val: Number(s.generatedInterest), type: oracledb.NUMBER },
                P_SAVING_TYPE_ID: { val: Number(s.savingTypeId), type: oracledb.NUMBER }
            }
        );

        return res.status(201).json({ message: 'Ahorro creado', data: s });
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
}

async function patchSaving(req: NextApiRequest, res: NextApiResponse) {
    try {
        const s = req.body;

        await runQuery(
            `BEGIN
                pkg_saving_crud.update_saving(
                :P_SAVING_ID,
                :P_ASSOCIATE_ID,
                :P_NAME,
                :P_CURRENT_BALANCE,
                :P_MONTHLY_AMOUNT,
                :P_INTEREST_RATE,
                :P_DEADLINE,
                :P_GENERATED_INTEREST,
                :P_SAVING_TYPE_ID
                );
            END;`,
            {
                P_SAVING_ID: { val: Number(s.savingId), type: oracledb.NUMBER },
                P_ASSOCIATE_ID: { val: Number(s.associateId), type: oracledb.NUMBER },
                P_NAME: { val: s.name, type: oracledb.STRING },
                P_CURRENT_BALANCE: { val: Number(s.currentBalance), type: oracledb.NUMBER },
                P_MONTHLY_AMOUNT: { val: Number(s.monthlyAmount), type: oracledb.NUMBER },
                P_INTEREST_RATE: { val: Number(s.interestRate), type: oracledb.NUMBER },
                P_DEADLINE: { val: toOracleJsDate(s.deadline), type: oracledb.DATE },
                P_GENERATED_INTEREST: { val: Number(s.generatedInterest), type: oracledb.NUMBER },
                P_SAVING_TYPE_ID: { val: Number(s.savingTypeId), type: oracledb.NUMBER }
            }
        );

        return res.status(200).json({ message: 'Ahorro actualizado', data: s });
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
}

async function deleteSaving(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { savingId } = req.body;

        if (!savingId) {
            return res.status(400).json({ error: 'el savingId es requerido' });
        }

        await runQuery(
            `BEGIN
                pkg_saving_crud.delete_saving(:P_ID);
            END;`,
            { P_ID: { val: Number(savingId), type: oracledb.NUMBER } }
        );
        console.log(savingId);

        return res.status(200).json({ message: 'Ahorro eliminado', id: savingId });
    } catch (err: any) {
        console.log(err)
        return res.status(500).json({ error: err.message });
    }
}
