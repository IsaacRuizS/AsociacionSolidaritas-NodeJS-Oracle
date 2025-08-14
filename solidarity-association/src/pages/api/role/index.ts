import { runQuery } from '@/utils/dbConnection';
import oracledb from 'oracledb';

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return await getRole(req, res);

    case 'POST':
      return await postRole(req, res);

    case 'PATCH':
      return await patchRole(req, res);

    case 'DELETE':
      return await deleteRole(req, res);

    default:
      return res.status(405).json({ message: 'Método no permitido' })
  }
}

async function getRole(req: NextApiRequest, res: NextApiResponse) {
  const result = await runQuery('SELECT * FROM VW_ROLE', {});
  return res.status(200).json(result.rows);
}

async function postRole(req: NextApiRequest, res: NextApiResponse) {
  const nuevoRol = req.body;
  const result = await runQuery('BEGIN SP_CREATE_ROLE(:P_NAME, :P_DESCRIPTION); END;', {
    P_NAME: { val: nuevoRol.name, type: oracledb.STRING },
    P_DESCRIPTION: { val: nuevoRol.description, type: oracledb.STRING },
  });
  return res.status(201).json({ message: 'Rol creado', data: nuevoRol });
}

async function patchRole(req: NextApiRequest, res: NextApiResponse) {
  const rolActualizar = req.body;
  const result = await runQuery('BEGIN SP_UPDATE_ROLE(:P_ROLE_ID, :P_NAME, :P_DESCRIPTION); END;', {
    P_ROLE_ID: { val: rolActualizar.roleId, type: oracledb.NUMBER },
    P_NAME: { val: rolActualizar.name, type: oracledb.STRING },
    P_DESCRIPTION: { val: rolActualizar.description, type: oracledb.STRING },
  });
  return res.status(200).json({ message: 'Rol actualizado', data: rolActualizar });
}

async function deleteRole(req: NextApiRequest, res: NextApiResponse) {
  const { roleId } = req.body;

  const result = await runQuery('BEGIN SP_DELETE_ROLE(:P_ROLE_ID); END;', {
    P_ROLE_ID: { val: roleId, type: oracledb.NUMBER },
  });

  return res.status(200).json({ message: 'Rol eliminado' });
}
