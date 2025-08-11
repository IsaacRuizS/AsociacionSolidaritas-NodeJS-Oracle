import { runQuery } from '@/utils/dbConnection';
import oracledb from 'oracledb';

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return await getLaborCondition(req, res);

    case 'POST':
      return await postLaborCondition(req, res);

    case 'PATCH':
      return await patchLaborCondition(req, res);

    case 'DELETE':
      return await deleteLaborCondition(req, res);

    default:
      return res.status(405).json({ message: 'Método no permitido' })
  }
}

async function getLaborCondition(req: NextApiRequest, res: NextApiResponse) {
  const result = await runQuery('SELECT * FROM VW_LABOR_CONDITION', {});
  return res.status(200).json(result.rows);
}

async function postLaborCondition(req: NextApiRequest, res: NextApiResponse) {
  const nuevaCondicion = req.body;
  const result = await runQuery('BEGIN SP_CREATE_LABOR_CONDITION(:P_DESCRIPTION); END;', {
    P_DESCRIPTION: { val: nuevaCondicion.description, type: oracledb.STRING },
  });
  return res.status(201).json({ message: 'Condición laboral creada', data: nuevaCondicion });
}

async function patchLaborCondition(req: NextApiRequest, res: NextApiResponse) {
  const condicionActualizar = req.body;
  const result = await runQuery('BEGIN SP_UPDATE_LABOR_CONDITION(:P_CONDITION_ID, :P_DESCRIPTION); END;', {
    P_CONDITION_ID: { val: condicionActualizar.conditionId, type: oracledb.NUMBER },
    P_DESCRIPTION: { val: condicionActualizar.description, type: oracledb.STRING },
  });
  return res.status(200).json({ message: 'Condición laboral actualizada', data: condicionActualizar });
}

async function deleteLaborCondition(req: NextApiRequest, res: NextApiResponse) {
  const conditionId = req.query.conditionId;
  const result = await runQuery('BEGIN SP_DELETE_LABOR_CONDITION(:P_CONDITION_ID); END;', {
    P_CONDITION_ID: { val: conditionId, type: oracledb.NUMBER },
  });
  return res.status(200).json({ message: 'Condición laboral eliminada' });
}
