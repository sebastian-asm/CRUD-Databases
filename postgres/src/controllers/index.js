import dbConnection from '../db/dbConnection.js';

export const getAllUsers = async (_, res, next) => {
  const db = dbConnection();
  try {
    await db.connect();
    const { rows, rowCount } = await db.query('SELECT * FROM users');

    res.json({
      ok: true,
      msg: 'Listado de todos los usuarios.',
      count: rowCount,
      users: rows,
    });

    await db.end();
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  const { id } = req.params;
  const db = dbConnection();
  try {
    await db.connect();
    const { rows, rowCount } = await db.query(
      `SELECT * FROM users WHERE id = '${id}'`
    );

    if (!rowCount) throw new Error('El usuario no existe.');

    const [user] = rows;
    res.json({
      ok: true,
      msg: 'Información del usuario.',
      user,
    });

    await db.end();
  } catch (error) {
    next(error);
  }
};

export const addUser = async (req, res, next) => {
  const { name, email } = req.body;
  const db = dbConnection();
  try {
    await db.connect();
    const { rowCount } = await db.query(
      `SELECT * FROM users WHERE email = '${email}'`
    );

    if (rowCount) throw new Error('El email ya está registrado.');

    const { rows } = await db.query(
      `INSERT INTO users (name, email) VALUES ('${name}', '${email}') RETURNING *`
    );

    const [user] = rows;
    res.status(201).json({
      ok: true,
      msg: 'Usuario creado correctamente.',
      user,
    });

    await db.end();
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  const db = dbConnection();
  try {
    await db.connect();
    const { rowCount } = await db.query(
      `SELECT * FROM users WHERE id = '${id}'`
    );

    if (!rowCount) throw new Error('El usuario no existe.');

    await db.query(`DELETE FROM users WHERE id = '${id}'`);

    res.json({
      ok: true,
      msg: 'Usuario eliminado correctamente.',
    });

    await db.end();
  } catch (error) {
    next(error);
  }
};

export const deleteAllUser = async (_, res, next) => {
  const db = dbConnection();
  try {
    await db.connect();
    await db.query('DELETE FROM users');

    res.json({
      ok: true,
      msg: 'Todos los usuarios eliminados.',
    });

    await db.end();
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const db = dbConnection();
  try {
    await db.connect();
    const { rowCount: userExists } = await db.query(
      `SELECT * FROM users WHERE id = '${id}'`
    );

    if (!userExists) throw new Error('El usuario no existe.');

    const { rowCount: emailExists } = await db.query(
      `SELECT * FROM users WHERE email = '${email}'`
    );

    if (emailExists) throw new Error('El email ya está registrado.');

    const { rows } = await db.query(
      `UPDATE users SET name = '${name}', email = '${email}' WHERE id = '${id}' RETURNING *`
    );

    const [user] = rows;
    res.json({
      ok: true,
      msg: 'Usuario actualizado correctamente.',
      user,
    });

    await db.end();
  } catch (error) {
    next(error);
  }
};
