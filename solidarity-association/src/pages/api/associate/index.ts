import { runQuery } from '@/utils/dbConnection';
import oracledb from 'oracledb';

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const result = await runQuery('BEGIN PKG_USUARIOS.SELECCIONAR_USUARIOS(:CURSOR); END;', { CURSOR: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT } });
      return res.status(200).json(result.rows);

    case 'POST':
      const nuevoUsuario = req.body
      return res.status(201).json({ message: 'Usuario creado', data: nuevoUsuario })

    case 'PATCH':
      return res.status(200).json({ message: 'Usuario actualizado' })

    case 'DELETE':
      return res.status(200).json({ message: 'Usuario eliminado' })

    default:
      return res.status(405).json({ message: 'Método no permitido' })
  }
}
