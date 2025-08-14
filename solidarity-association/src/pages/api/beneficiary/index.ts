import { runQuery } from '@/utils/dbConnection';
import oracledb from 'oracledb';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            return await getBeneficiary(req, res);
        case 'POST':
            return await postBeneficiary(req, res);
        case 'PATCH':
            return await patchBeneficiary(req, res);
        case 'DELETE':
            return await deleteBeneficiary(req, res);
        default:
            return res.status(405).json({ message: 'Método no permitido' });
    }
}

async function getBeneficiary(req: NextApiRequest, res: NextApiResponse) {
    try {
        const rows = await runQuery(
            `BEGIN
                :cursor := pkg_beneficiary_crud.get_beneficiaries();
            END;`,
            { cursor: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR } }
        );

        return res.status(200).json(rows);
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
}

async function postBeneficiary(req: NextApiRequest, res: NextApiResponse) {
    try {
        const b = req.body;

        await runQuery(
            `BEGIN
                pkg_beneficiary_crud.create_beneficiary(
                :P_ASSOCIATE_ID,
                :P_FIRST_NAME,
                :P_LAST_NAME_1,
                :P_LAST_NAME_2,
                :P_RELATIONSHIP,
                :P_PERCENTAGE,
                :P_EMAIL,
                :P_PHONE
                );
            END;`,
            {
                P_ASSOCIATE_ID: { val: Number(b.associateId), type: oracledb.NUMBER },
                P_FIRST_NAME: { val: b.firstName, type: oracledb.STRING },
                P_LAST_NAME_1: { val: b.lastName1, type: oracledb.STRING },
                P_LAST_NAME_2: { val: b.lastName2, type: oracledb.STRING },
                P_RELATIONSHIP: { val: b.relationship, type: oracledb.STRING },
                P_PERCENTAGE: { val: Number(b.percentage), type: oracledb.NUMBER },
                P_EMAIL: { val: b.email, type: oracledb.STRING },
                P_PHONE: { val: String(b.phone), type: oracledb.STRING },
            }
        );

        return res.status(201).json({ message: 'Beneficiario creado', data: b });
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
}

async function patchBeneficiary(req: NextApiRequest, res: NextApiResponse) {
    try {
        const b = req.body;

        await runQuery(
            `BEGIN
                pkg_beneficiary_crud.update_beneficiary(
                :P_BENEFICIARY_ID,
                :P_ASSOCIATE_ID,
                :P_FIRST_NAME,
                :P_LAST_NAME_1,
                :P_LAST_NAME_2,
                :P_RELATIONSHIP,
                :P_PERCENTAGE,
                :P_EMAIL,
                :P_PHONE
                );
            END;`,
            {
                P_BENEFICIARY_ID: { val: Number(b.beneficiaryId), type: oracledb.NUMBER },
                P_ASSOCIATE_ID: { val: Number(b.associateId), type: oracledb.NUMBER },
                P_FIRST_NAME: { val: b.firstName, type: oracledb.STRING },
                P_LAST_NAME_1: { val: b.lastName1, type: oracledb.STRING },
                P_LAST_NAME_2: { val: b.lastName2, type: oracledb.STRING },
                P_RELATIONSHIP: { val: b.relationship, type: oracledb.STRING },
                P_PERCENTAGE: { val: Number(b.percentage), type: oracledb.NUMBER },
                P_EMAIL: { val: b.email, type: oracledb.STRING },
                P_PHONE: { val: String(b.phone), type: oracledb.STRING },
            }
        );

        return res.status(200).json({ message: 'Beneficiario actualizado', data: b });
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
}

async function deleteBeneficiary(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { beneficiaryId } = req.body;

        if (!beneficiaryId) {
            return res.status(400).json({ error: 'beneficiaryId is required' });
        }

        await runQuery(
            `BEGIN
                pkg_beneficiary_crud.delete_beneficiary(:P_ID);
            END;`,
            { P_ID: { val: Number(beneficiaryId), type: oracledb.NUMBER } }
        );

        return res.status(200).json({ message: 'Beneficiario eliminado', id: beneficiaryId });
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
}
