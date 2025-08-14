import { runQuery } from '@/utils/dbConnection';
import { toOracleJsDate } from '@/utils/helper';
import oracledb from 'oracledb';

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            return await getCredit(req, res);
        case 'POST':
            return await postCredit(req, res);
        case 'PATCH':
            return await patchCredit(req, res);
        case 'DELETE':
            return await deleteCredit(req, res);
        default:
            return res.status(405).json({ message: 'Método no permitido' });
    }
}

async function getCredit(req: NextApiRequest, res: NextApiResponse) {
    try {
        const rows = await runQuery(
            `BEGIN
                :cursor := pkg_credit_crud.get_credits();
            END;`,
            { cursor: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR } }
        );

        return res.status(200).json(rows);
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
}

async function postCredit(req: NextApiRequest, res: NextApiResponse) {
    try {
        const c = req.body;

        await runQuery(
            `BEGIN
                pkg_credit_crud.create_credit(
                :P_ASSOCIATE_ID,
                :P_NAME,
                :P_REQUESTED_AMOUNT,
                :P_TERM_MONTHS,
                :P_CURRENT_BALANCE,
                :P_MONTHLY_PAYMENT,
                :P_INTEREST_RATE,
                :P_REQUEST_DATE,
                :P_CREDIT_STATUS_ID
                );
            END;`,
            {
                P_ASSOCIATE_ID: { val: Number(c.associateId), type: oracledb.NUMBER },
                P_NAME: { val: c.name, type: oracledb.STRING },
                P_REQUESTED_AMOUNT: { val: Number(c.requestedAmount), type: oracledb.NUMBER },
                P_TERM_MONTHS: { val: Number(c.termMonths), type: oracledb.NUMBER },
                P_CURRENT_BALANCE: { val: Number(c.currentBalance), type: oracledb.NUMBER },
                P_MONTHLY_PAYMENT: { val: Number(c.monthlyPayment), type: oracledb.NUMBER },
                P_INTEREST_RATE: { val: Number(c.interestRate), type: oracledb.NUMBER },
                P_REQUEST_DATE: { val: toOracleJsDate(c.requestDate), type: oracledb.DATE },
                P_CREDIT_STATUS_ID: { val: Number(c.creditStatusId), type: oracledb.NUMBER }
            }
        );

        return res.status(201).json({ message: 'Crédito creado', data: c });
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
}

async function patchCredit(req: NextApiRequest, res: NextApiResponse) {
    try {
        const c = req.body;

        await runQuery(
            `BEGIN
                pkg_credit_crud.update_credit(
                :P_CREDIT_ID,
                :P_ASSOCIATE_ID,
                :P_NAME,
                :P_REQUESTED_AMOUNT,
                :P_TERM_MONTHS,
                :P_CURRENT_BALANCE,
                :P_MONTHLY_PAYMENT,
                :P_INTEREST_RATE,
                :P_APPROVAL_DATE,
                :P_CREDIT_STATUS_ID
                );
            END;`,
            {
                P_CREDIT_ID: { val: Number(c.creditId), type: oracledb.NUMBER },
                P_ASSOCIATE_ID: { val: Number(c.associateId), type: oracledb.NUMBER },
                P_NAME: { val: c.name, type: oracledb.STRING },
                P_REQUESTED_AMOUNT: { val: Number(c.requestedAmount), type: oracledb.NUMBER },
                P_TERM_MONTHS: { val: Number(c.termMonths), type: oracledb.NUMBER },
                P_CURRENT_BALANCE: { val: Number(c.currentBalance), type: oracledb.NUMBER },
                P_MONTHLY_PAYMENT: { val: Number(c.monthlyPayment), type: oracledb.NUMBER },
                P_INTEREST_RATE: { val: Number(c.interestRate), type: oracledb.NUMBER },
                P_APPROVAL_DATE: { val: toOracleJsDate(c.approvalDate), type: oracledb.DATE },
                P_CREDIT_STATUS_ID: { val: Number(c.creditStatusId), type: oracledb.NUMBER }
            }
        );

        return res.status(200).json({ message: 'Crédito actualizado', data: c });
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
}

async function deleteCredit(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { creditId } = req.body;

        if (!creditId) {
            return res.status(400).json({ error: 'creditId is required' });
        }

        await runQuery(
            `BEGIN
                pkg_credit_crud.delete_credit(:P_ID);
            END;`,
            { P_ID: { val: Number(creditId), type: oracledb.NUMBER } }
        );

        return res.status(200).json({ message: 'Crédito eliminado', id: creditId });
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
}
