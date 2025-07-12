import { runQuery } from '@/utils/dbConnection';
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
  const result = await runQuery('SELECT * FROM VW_SAVING', {});
  return res.status(200).json(result.rows);
}

async function postSaving(req: NextApiRequest, res: NextApiResponse) {
  const nuevoUsuario = req.body;
  const result = await runQuery('BEGIN PKG_SAVING.AgregarAhorro(:P_ASSOCIATE_ID, :P_NAME, :P_CURRENT_BALANCE, :P_MONTHLY_AMOUNT, :P_INTEREST_RATE, :P_DEADLINE); END;', {
    P_ASSOCIATE_ID: { val: nuevoUsuario.associateId, type: oracledb.NUMBER },
    P_NAME: { val: nuevoUsuario.name, type: oracledb.STRING },
    P_CURRENT_BALANCE: { val: nuevoUsuario.currentBalance, type: oracledb.NUMBER },
    P_MONTHLY_AMOUNT: { val: nuevoUsuario.monthlyAmount, type: oracledb.NUMBER },
    P_INTEREST_RATE: { val: nuevoUsuario.interestRate, type: oracledb.NUMBER },
    P_DEADLINE: { val: nuevoUsuario.deadline, type: oracledb.DATE },
  });
  return res.status(201).json({ message: 'Ahorro creado', data: nuevoUsuario });
}

async function patchSaving(req: NextApiRequest, res: NextApiResponse) {
  const usuarioActualizar = req.body;
  const result = await runQuery('BEGIN PKG_SAVING.ActualizarAhorro(:P_SAVING_ID, :P_ASSOCIATE_ID, :P_NAME, :P_CURRENT_BALANCE, :P_MONTHLY_AMOUNT, :P_INTEREST_RATE, :P_DEADLINE); END;', {
    P_SAVING_ID: { val: usuarioActualizar.savingId, type: oracledb.NUMBER },
    P_ASSOCIATE_ID: { val: usuarioActualizar.associateId, type: oracledb.NUMBER },
    P_NAME: { val: usuarioActualizar.name, type: oracledb.STRING },
    P_CURRENT_BALANCE: { val: usuarioActualizar.currentBalance, type: oracledb.NUMBER },
    P_MONTHLY_AMOUNT: { val: usuarioActualizar.monthlyAmount, type: oracledb.NUMBER },
    P_INTEREST_RATE: { val: usuarioActualizar.interestRate, type: oracledb.NUMBER },
    P_DEADLINE: { val: usuarioActualizar.deadline, type: oracledb.DATE },
  });
  return res.status(200).json({ message: 'Ahorro actualizado', data: usuarioActualizar });
}

async function deleteSaving(req: NextApiRequest, res: NextApiResponse) {
  const savingId = req.query.savingId;
  const result = await runQuery('BEGIN PKG_SAVING.EliminarAhorro(:P_SAVING_ID); END;', {
    P_SAVING_ID: { val: savingId, type: oracledb.NUMBER },
  });
  return res.status(200).json({ message: 'Ahorro eliminado' });
}
