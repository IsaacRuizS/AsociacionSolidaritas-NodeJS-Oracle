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

  const result = await runQuery('SELECT * FROM VW_ASSOCIATE', {});
  return res.status(200).json(result.rows);
}

async function postAssociate(req: NextApiRequest, res: NextApiResponse) {
  const nuevoAsociado = req.body;
  const result = await runQuery('BEGIN SP_CREATE_ASSOCIATE(:P_FIRST_NAME, :P_LAST_NAME_1, :P_LAST_NAME_2, :P_NATIONAL_ID, :P_EMAIL, :P_PHONE, :P_GROSS_SALARY); END;', {
    P_FIRST_NAME: { val: nuevoAsociado.firstName, type: oracledb.STRING },
    P_LAST_NAME_1: { val: nuevoAsociado.lastName1, type: oracledb.STRING },
    P_LAST_NAME_2: { val: nuevoAsociado.lastName2, type: oracledb.STRING },
    P_NATIONAL_ID: { val: nuevoAsociado.nationalId, type: oracledb.STRING },
    P_EMAIL: { val: nuevoAsociado.email, type: oracledb.STRING },
    P_PHONE: { val: nuevoAsociado.phone, type: oracledb.STRING },
    P_GROSS_SALARY: { val: nuevoAsociado.grossSalary, type: oracledb.NUMBER },
  });
  return res.status(201).json({ message: 'Asociado creado', data: nuevoAsociado });
}

async function patchAssociate(req: NextApiRequest, res: NextApiResponse) {
  const asociadoActualizar = req.body;
  const result = await runQuery('BEGIN SP_UPDATE_ASSOCIATE(:P_ID, :P_FIRST_NAME, :P_LAST_NAME_1, :P_LAST_NAME_2, :P_NATIONAL_ID, :P_EMAIL, :P_PHONE, :P_GROSS_SALARY); END;', {
    P_ID: { val: asociadoActualizar.id, type: oracledb.NUMBER },
    P_FIRST_NAME: { val: asociadoActualizar.firstName, type: oracledb.STRING },
    P_LAST_NAME_1: { val: asociadoActualizar.lastName1, type: oracledb.STRING },
    P_LAST_NAME_2: { val: asociadoActualizar.lastName2, type: oracledb.STRING },
    P_NATIONAL_ID: { val: asociadoActualizar.nationalId, type: oracledb.STRING },
    P_EMAIL: { val: asociadoActualizar.email, type: oracledb.STRING },
    P_PHONE: { val: asociadoActualizar.phone, type: oracledb.STRING },
    P_GROSS_SALARY: { val: asociadoActualizar.grossSalary, type: oracledb.NUMBER },
  });
  return res.status(200).json({ message: 'Asociado actualizado', data: asociadoActualizar });
}

async function deleteAssociate(req: NextApiRequest, res: NextApiResponse) {
  const associateId = req.query.associateId;
  const result = await runQuery('BEGIN SP_DELETE_ASSOCIATE(:P_ID); END;', {
    P_ID: { val: associateId, type: oracledb.NUMBER },
  });
  return res.status(200).json({ message: 'Asociado eliminado' });
}
