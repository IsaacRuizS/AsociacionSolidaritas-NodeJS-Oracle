import { runQuery } from '@/utils/dbConnection';
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
                PKG_ASSOCIATE_CRUD.create_associate(:FIRST_NAME, :LAST_NAME_1, :LAST_NAME_2, :NATIONAL_ID, :EMAIL, :PHONE, :GROSS_SALARY);
            END;`,
            {
                FIRST_NAME: { val: nuevoAsociado.firstName, type: oracledb.STRING },
                LAST_NAME_1: { val: nuevoAsociado.lastName1, type: oracledb.STRING },
                LAST_NAME_2: { val: nuevoAsociado.lastName2, type: oracledb.STRING },
                NATIONAL_ID: { val: nuevoAsociado.nationalId, type: oracledb.STRING },
                EMAIL: { val: nuevoAsociado.email, type: oracledb.STRING },
                PHONE: { val: nuevoAsociado.phone, type: oracledb.STRING },
                GROSS_SALARY: { val: nuevoAsociado.grossSalary, type: oracledb.NUMBER }
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
            :ID,
            :FIRST_NAME,
            :LAST_NAME_1,
            :LAST_NAME_2,
            :NATIONAL_ID,
            :EMAIL,
            :PHONE,
            :GROSS_SALARY
            );
        END;`,
        {
            ID: { val: asociadoActualizar.id, type: oracledb.NUMBER },
            FIRST_NAME: { val: asociadoActualizar.firstName, type: oracledb.STRING },
            LAST_NAME_1: { val: asociadoActualizar.lastName1, type: oracledb.STRING },
            LAST_NAME_2: { val: asociadoActualizar.lastName2, type: oracledb.STRING },
            NATIONAL_ID: { val: asociadoActualizar.nationalId, type: oracledb.STRING },
            EMAIL: { val: asociadoActualizar.email, type: oracledb.STRING },
            PHONE: { val: asociadoActualizar.phone, type: oracledb.STRING },
            GROSS_SALARY: { val: asociadoActualizar.grossSalary, type: oracledb.NUMBER }
        }
        );

        return res.status(200).json({
            message: 'Asociado actualizado',
            data: asociadoActualizar
        });

    } catch (err: any) {

        return res.status(500).json({ error: err.message });
    }
}

async function deleteAssociate(req: NextApiRequest, res: NextApiResponse) {
    try {

        const { associateId } = req.body;

        if (!associateId) {
            
            return res.status(400).json({ error: 'associateId is required' });
        }   

        await runQuery(
                `BEGIN
                    PKG_ASSOCIATE_CRUD.delete_associate(:ID);
                END;`,
                {
                    ID: { val: associateId, type: oracledb.NUMBER }
                }
            );

            return res.status(200).json({
                message: 'Asociado eliminado',
                id: associateId
            });
        
    } catch (err: any) {

        return res.status(500).json({ error: err.message });
    }
}