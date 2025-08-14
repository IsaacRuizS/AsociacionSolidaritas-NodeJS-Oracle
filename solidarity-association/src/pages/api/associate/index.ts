
import { runQuery } from '@/utils/dbConnection';
import { toOracleJsDate } from '@/utils/helper';
import oracledb from 'oracledb';

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
        return await getAssociate(req, res);

        case 'POST':
        return await postAssociate(req, res);

        case 'PATCH':
        return await patchAssociate(req, res);

        case 'DELETE':
        return await deleteAssociate(req, res);

        default:
        return res.status(405).json({ message: 'Método no permitido' })
    }
}

async function getAssociate(req: NextApiRequest, res: NextApiResponse) {
    try {
        const rows = await runQuery(
        `BEGIN
            :cursor := PKG_ASSOCIATE_CRUD.get_associates();
        END;`,
        { cursor: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR } }
        );

        return res.status(200).json(rows);

    } catch (err: any) {

        return res.status(500).json({ error: err.message });
    }
}

async function postAssociate(req: NextApiRequest, res: NextApiResponse) {
    try {
        const nuevoAsociado = req.body;

        const result = await runQuery(
            `BEGIN
                PKG_ASSOCIATE_CRUD.create_associate(
                :P_FIRST_NAME, 
                :P_LAST_NAME_1, 
                :P_LAST_NAME_2, 
                :P_NATIONAL_ID, 
                :P_EMAIL, 
                :P_PHONE, 
                :P_GROSS_SALARY,
                :P_ID_ROLE,
                :P_ENTRY_DATE,
                :P_LABORCONDITION_ID);
            END;`,
            {
                P_FIRST_NAME: { val: nuevoAsociado.firstName, type: oracledb.STRING },
                P_LAST_NAME_1: { val: nuevoAsociado.lastName1, type: oracledb.STRING },
                P_LAST_NAME_2: { val: nuevoAsociado.lastName2, type: oracledb.STRING },
                P_NATIONAL_ID: { val: nuevoAsociado.nationalId, type: oracledb.STRING },
                P_EMAIL: { val: nuevoAsociado.email, type: oracledb.STRING },
                P_PHONE: { val: nuevoAsociado.phone, type: oracledb.STRING },
                P_GROSS_SALARY: { val: nuevoAsociado.grossSalary, type: oracledb.NUMBER },
                P_ID_ROLE: { val: nuevoAsociado.roleId, type: oracledb.NUMBER },
                P_ENTRY_DATE: { val: toOracleJsDate(nuevoAsociado.entryDate), type: oracledb.DATE },
                P_LABORCONDITION_ID: { val: nuevoAsociado.laborConditionId, type: oracledb.NUMBER }
            }
        );

        return res.status(201).json({message: 'Asociado creado', data: nuevoAsociado});
        
    } catch (err: any) {

        return res.status(500).json({ error: err.message });
    }
}

async function patchAssociate(req: NextApiRequest, res: NextApiResponse) {
    try {

        const asociadoActualizar = req.body;

        const result = await runQuery(
            `BEGIN
                PKG_ASSOCIATE_CRUD.update_associate(
                :P_ID,
                :P_FIRST_NAME,
                :P_LAST_NAME_1,
                :P_LAST_NAME_2,
                :P_NATIONAL_ID,
                :P_EMAIL,
                :P_PHONE,
                :P_GROSS_SALARY,
                :P_ID_ROLE,
                :P_ENTRY_DATE,
                :P_LABORCONDITION_ID
                );
            END;`,
            {
                P_ID: { val: asociadoActualizar.associateId, type: oracledb.NUMBER },
                P_FIRST_NAME: { val: asociadoActualizar.firstName, type: oracledb.STRING },
                P_LAST_NAME_1: { val: asociadoActualizar.lastName1, type: oracledb.STRING },
                P_LAST_NAME_2: { val: asociadoActualizar.lastName2, type: oracledb.STRING },
                P_NATIONAL_ID: { val: asociadoActualizar.nationalId, type: oracledb.STRING },
                P_EMAIL: { val: asociadoActualizar.email, type: oracledb.STRING },
                P_PHONE: { val: asociadoActualizar.phone, type: oracledb.STRING },
                P_GROSS_SALARY: { val: asociadoActualizar.grossSalary, type: oracledb.NUMBER },
                P_ID_ROLE: { val: asociadoActualizar.roleId, type: oracledb.NUMBER },
                P_ENTRY_DATE: { val: toOracleJsDate(asociadoActualizar.entryDate), type: oracledb.DATE },
                P_LABORCONDITION_ID: { val: asociadoActualizar.laborConditionId, type: oracledb.NUMBER }
            }
        );

        return res.status(200).json({
            message: 'Asociado actualizado',
            data: asociadoActualizar
        });

    } catch (err: any) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
}

async function deleteAssociate(req: NextApiRequest, res: NextApiResponse) {
    try {

        const { associateId } = req.body;

        if (!associateId) {
            
            return res.status(400).json({ error: 'associateId is required' });
        }   

        let result = await runQuery(
            `BEGIN
                PKG_ASSOCIATE_CRUD.delete_associate(:P_ID);
            END;`,
            {
                P_ID: { val: associateId, type: oracledb.NUMBER }
            }
        );

        return res.status(200).json({
            message: 'Asociado eliminado',
            id: associateId
        });
        
    } catch (err: any) {

        console.error(err);
        return res.status(500).json({ error: err.message });
    }
}