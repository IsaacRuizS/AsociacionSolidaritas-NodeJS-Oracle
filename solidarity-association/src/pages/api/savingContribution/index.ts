import { runQuery } from '@/utils/dbConnection';
import oracledb from 'oracledb';

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return await getSavingContribution(req, res);

    case 'POST':
      return await postSavingContribution(req, res);

    case 'PATCH':
      return await patchSavingContribution(req, res);

    case 'DELETE':
      return await deleteSavingContribution(req, res);

    default:
      return res.status(405).json({ message: 'Método no permitido' })
  }
}

async function getSavingContribution(req: NextApiRequest, res: NextApiResponse) {
  const result = await runQuery('SELECT * FROM VW_SAVING_CONTRIBUTION', {});
  return res.status(200).json(result.rows);
}

async function postSavingContribution(req: NextApiRequest, res: NextApiResponse) {
  const nuevaContribucion = req.body;
  const result = await runQuery('BEGIN SP_CREATE_SAVING_CONTRIBUTION(:SAVING_ID, :AMOUNT, :DATE_SAVING_CONTRIBUTION); END;', {
    SAVING_ID: { val: nuevaContribucion.savingId, type: oracledb.NUMBER },
    AMOUNT: { val: nuevaContribucion.amount, type: oracledb.NUMBER },
    DATE_SAVING_CONTRIBUTION: { val: nuevaContribucion.dateSavingContribution, type: oracledb.DATE },
  });

  console.log(result);
  return res.status(201).json({ message: 'Contribución de ahorro creada', data: nuevaContribucion });
}

async function patchSavingContribution(req: NextApiRequest, res: NextApiResponse) {
  const contribucionActualizar = req.body;
  const result = await runQuery('BEGIN SP_UPDATE_SAVING_CONTRIBUTION(:CONTRIBUTION_ID, :SAVING_ID, :AMOUNT, :DATE_SAVING_CONTRIBUTION); END;', {
    CONTRIBUTION_ID: { val: contribucionActualizar.contributionId, type: oracledb.NUMBER },
    SAVING_ID: { val: contribucionActualizar.savingId, type: oracledb.NUMBER },
    AMOUNT: { val: contribucionActualizar.amount, type: oracledb.NUMBER },
    DATE_SAVING_CONTRIBUTION: { val: contribucionActualizar.dateSavingContribution, type: oracledb.DATE },
  });
  return res.status(200).json({ message: 'Contribución de ahorro actualizada', data: contribucionActualizar });
}

async function deleteSavingContribution(req: NextApiRequest, res: NextApiResponse) {
  const contributionId = req.query.contributionId;
  const result = await runQuery('BEGIN SP_DELETE_SAVING_CONTRIBUTION(:CONTRIBUTION_ID); END;', {
    CONTRIBUTION_ID: { val: contributionId, type: oracledb.NUMBER },
  });
  return res.status(200).json({ message: 'Contribución de ahorro eliminada' });
}
