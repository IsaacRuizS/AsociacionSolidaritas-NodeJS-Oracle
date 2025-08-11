import { runQuery } from '@/utils/dbConnection';
import oracledb from 'oracledb';

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return await getCreditStatus(req, res);

    case 'POST':
      return await postCreditStatus(req, res);

    case 'PATCH':
      return await patchCreditStatus(req, res);

    case 'DELETE':
      return await deleteCreditStatus(req, res);

    default:
      return res.status(405).json({ message: 'Método no permitido' })
  }
}

async function getCreditStatus(req: NextApiRequest, res: NextApiResponse) {
  const result = await runQuery('SELECT * FROM VW_CREDIT_STATUS', {});
  return res.status(200).json(result.rows);
}

async function postCreditStatus(req: NextApiRequest, res: NextApiResponse) {
  const nuevoEstado = req.body;
  const result = await runQuery('BEGIN SP_CREATE_CREDIT_STATUS(:P_DESCRIPTION); END;', {
    P_DESCRIPTION: { val: nuevoEstado.description, type: oracledb.STRING },
  });
  return res.status(201).json({ message: 'Estado de crédito creado', data: nuevoEstado });
}

async function patchCreditStatus(req: NextApiRequest, res: NextApiResponse) {
  const estadoActualizar = req.body;
  const result = await runQuery('BEGIN SP_UPDATE_CREDIT_STATUS(:P_STATUS_ID, :P_DESCRIPTION); END;', {
    P_STATUS_ID: { val: estadoActualizar.statusId, type: oracledb.NUMBER },
    P_DESCRIPTION: { val: estadoActualizar.description, type: oracledb.STRING },
  });
  return res.status(200).json({ message: 'Estado de crédito actualizado', data: estadoActualizar });
}

async function deleteCreditStatus(req: NextApiRequest, res: NextApiResponse) {
  const statusId = req.query.statusId;
  const result = await runQuery('BEGIN SP_DELETE_CREDIT_STATUS(:P_ID); END;', {
    P_ID: { val: statusId, type: oracledb.NUMBER },
  });
  return res.status(200).json({ message: 'Estado de crédito eliminado' });
}
