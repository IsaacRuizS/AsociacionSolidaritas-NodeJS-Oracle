import { runQuery } from '@/utils/dbConnection';
import oracledb from 'oracledb';

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return await getSavingType(req, res);

    case 'POST':
      return await postSavingType(req, res);

    case 'PATCH':
      return await patchSavingType(req, res);

    case 'DELETE':
      return await deleteSavingType(req, res);

    default:
      return res.status(405).json({ message: 'Método no permitido' })
  }
}

async function getSavingType(req: NextApiRequest, res: NextApiResponse) {
  const result = await runQuery('SELECT * FROM VW_SAVING_TYPE', {});
  return res.status(200).json(result.rows);
}

async function postSavingType(req: NextApiRequest, res: NextApiResponse) {
  const nuevoTipo = req.body;
  const result = await runQuery('BEGIN SP_CREATE_SAVING_TYPE(:P_NAME, :P_DESCRIPTION); END;', {
    P_NAME: { val: nuevoTipo.name, type: oracledb.STRING },
    P_DESCRIPTION: { val: nuevoTipo.description, type: oracledb.STRING },
  });
  return res.status(201).json({ message: 'Tipo de ahorro creado', data: nuevoTipo });
}

async function patchSavingType(req: NextApiRequest, res: NextApiResponse) {
  const tipoActualizar = req.body;
  const result = await runQuery('BEGIN SP_UPDATE_SAVING_TYPE(:P_SAVING_TYPE_ID, :P_NAME, :P_DESCRIPTION); END;', {
    P_SAVING_TYPE_ID: { val: tipoActualizar.savingTypeId, type: oracledb.NUMBER },
    P_NAME: { val: tipoActualizar.name, type: oracledb.STRING },
    P_DESCRIPTION: { val: tipoActualizar.description, type: oracledb.STRING },
  });
  return res.status(200).json({ message: 'Tipo de ahorro actualizado', data: tipoActualizar });
}

async function deleteSavingType(req: NextApiRequest, res: NextApiResponse) {
  const savingTypeId = req.query.savingTypeId;
  const result = await runQuery('BEGIN SP_DELETE_SAVING_TYPE(:P_SAVING_TYPE_ID); END;', {
    P_SAVING_TYPE_ID: { val: savingTypeId, type: oracledb.NUMBER },
  });
  return res.status(200).json({ message: 'Tipo de ahorro eliminado' });
}
