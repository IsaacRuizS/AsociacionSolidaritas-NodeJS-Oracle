import { runQuery } from '@/utils/dbConnection';
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
      return res.status(405).json({ message: 'Método no permitido' })
  }
}

async function getCredit(req: NextApiRequest, res: NextApiResponse) {
  const result = await runQuery('SELECT * FROM VW_CREDIT', {});
  return res.status(200).json(result.rows);
}

async function postCredit(req: NextApiRequest, res: NextApiResponse) {
  const nuevoCredito = req.body;
  const result = await runQuery('BEGIN SP_CREATE_CREDIT(:P_ASSOCIATE_ID, :P_NAME, :P_REQUESTED_AMOUNT, :P_CURRENT_BALANCE, :P_MONTHLY_PAYMENT, :P_INTEREST_RATE, :P_APPROVAL_DATE); END;', {
    P_ASSOCIATE_ID: { val: nuevoCredito.associateId, type: oracledb.NUMBER },
    P_NAME: { val: nuevoCredito.name, type: oracledb.STRING },
    P_REQUESTED_AMOUNT: { val: nuevoCredito.requestedAmount, type: oracledb.NUMBER },
    P_CURRENT_BALANCE: { val: nuevoCredito.currentBalance, type: oracledb.NUMBER },
    P_MONTHLY_PAYMENT: { val: nuevoCredito.monthlyPayment, type: oracledb.NUMBER },
    P_INTEREST_RATE: { val: nuevoCredito.interestRate, type: oracledb.NUMBER },
    P_APPROVAL_DATE: { val: nuevoCredito.approvalDate, type: oracledb.DATE },
  });
  return res.status(201).json({ message: 'Crédito creado', data: nuevoCredito });
}

async function patchCredit(req: NextApiRequest, res: NextApiResponse) {
  const creditoActualizar = req.body;
  const result = await runQuery('BEGIN SP_UPDATE_CREDIT(:P_CREDIT_ID, :P_ASSOCIATE_ID, :P_NAME, :P_REQUESTED_AMOUNT, :P_CURRENT_BALANCE, :P_MONTHLY_PAYMENT, :P_INTEREST_RATE, :P_APPROVAL_DATE); END;', {
    P_CREDIT_ID: { val: creditoActualizar.creditId, type: oracledb.NUMBER },
    P_ASSOCIATE_ID: { val: creditoActualizar.associateId, type: oracledb.NUMBER },
    P_NAME: { val: creditoActualizar.name, type: oracledb.STRING },
    P_REQUESTED_AMOUNT: { val: creditoActualizar.requestedAmount, type: oracledb.NUMBER },
    P_CURRENT_BALANCE: { val: creditoActualizar.currentBalance, type: oracledb.NUMBER },
    P_MONTHLY_PAYMENT: { val: creditoActualizar.monthlyPayment, type: oracledb.NUMBER },
    P_INTEREST_RATE: { val: creditoActualizar.interestRate, type: oracledb.NUMBER },
    P_APPROVAL_DATE: { val: creditoActualizar.approvalDate, type: oracledb.DATE },
  });
  return res.status(200).json({ message: 'Crédito actualizado', data: creditoActualizar });
}

async function deleteCredit(req: NextApiRequest, res: NextApiResponse) {
  const creditId = req.query.creditId;
  const result = await runQuery('BEGIN SP_DELETE_CREDIT(:P_ID); END;', {
    P_ID: { val: creditId, type: oracledb.NUMBER },
  });
  return res.status(200).json({ message: 'Crédito eliminado' });
}