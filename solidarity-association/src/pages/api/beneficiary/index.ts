import { runQuery } from '@/utils/dbConnection';
import oracledb from 'oracledb';

import type { NextApiRequest, NextApiResponse } from 'next'

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
      return res.status(405).json({ message: 'Método no permitido' })
  }
}

async function getBeneficiary(req: NextApiRequest, res: NextApiResponse) {
  const result = await runQuery('SELECT * FROM VW_BENEFICIARY', {});
  return res.status(200).json(result.rows);
}

async function postBeneficiary(req: NextApiRequest, res: NextApiResponse) {
  const nuevoBeneficiario = req.body;
  const result = await runQuery('BEGIN SP_CREATE_BENEFICIARY(:P_ASSOCIATE_ID, :P_FIRST_NAME, :P_LAST_NAME_1, :P_LAST_NAME_2, :P_RELATIONSHIP, :P_PERCENTAGE, :P_EMAIL, :P_PHONE); END;', {
    P_ASSOCIATE_ID: { val: nuevoBeneficiario.associateId, type: oracledb.NUMBER },
    P_FIRST_NAME: { val: nuevoBeneficiario.firstName, type: oracledb.STRING },
    P_LAST_NAME_1: { val: nuevoBeneficiario.lastName1, type: oracledb.STRING },
    P_LAST_NAME_2: { val: nuevoBeneficiario.lastName2, type: oracledb.STRING },
    P_RELATIONSHIP: { val: nuevoBeneficiario.relationship, type: oracledb.STRING },
    P_PERCENTAGE: { val: nuevoBeneficiario.percentage, type: oracledb.NUMBER },
    P_EMAIL: { val: nuevoBeneficiario.email, type: oracledb.STRING },
    P_PHONE: { val: nuevoBeneficiario.phone, type: oracledb.STRING },
  });
  return res.status(201).json({ message: 'Beneficiario creado', data: nuevoBeneficiario });
}

async function patchBeneficiary(req: NextApiRequest, res: NextApiResponse) {
  const beneficiarioActualizar = req.body;
  const result = await runQuery('BEGIN SP_UPDATE_BENEFICIARY(:P_BENEFICIARY_ID, :P_ASSOCIATE_ID, :P_FIRST_NAME, :P_LAST_NAME_1, :P_LAST_NAME_2, :P_RELATIONSHIP, :P_PERCENTAGE, :P_EMAIL, :P_PHONE); END;', {
    P_BENEFICIARY_ID: { val: beneficiarioActualizar.beneficiaryId, type: oracledb.NUMBER },
    P_ASSOCIATE_ID: { val: beneficiarioActualizar.associateId, type: oracledb.NUMBER },
    P_FIRST_NAME: { val: beneficiarioActualizar.firstName, type: oracledb.STRING },
    P_LAST_NAME_1: { val: beneficiarioActualizar.lastName1, type: oracledb.STRING },
    P_LAST_NAME_2: { val: beneficiarioActualizar.lastName2, type: oracledb.STRING },
    P_RELATIONSHIP: { val: beneficiarioActualizar.relationship, type: oracledb.STRING },
    P_PERCENTAGE: { val: beneficiarioActualizar.percentage, type: oracledb.NUMBER },
    P_EMAIL: { val: beneficiarioActualizar.email, type: oracledb.STRING },
    P_PHONE: { val: beneficiarioActualizar.phone, type: oracledb.STRING },
  });
  return res.status(200).json({ message: 'Beneficiario actualizado', data: beneficiarioActualizar });
}

async function deleteBeneficiary(req: NextApiRequest, res: NextApiResponse) {
  const beneficiaryId = req.query.beneficiaryId;
  const result = await runQuery('BEGIN SP_DELETE_BENEFICIARY(:P_ID); END;', {
    P_ID: { val: beneficiaryId, type: oracledb.NUMBER },
  });
  return res.status(200).json({ message: 'Beneficiario eliminado' });
}