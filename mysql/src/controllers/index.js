import dbConnection from '../db/dbConnection.js';

export const getAllUsers = async (_, res, next) => {
  try {
    const db = await dbConnection();
    const [[users, [{ count }]]] = await db.query(`
      SELECT * FROM users;
      SELECT COUNT(id) AS count FROM users
    `);

    res.json({
      ok: true,
      msg: 'Listado de todos los usuarios.',
      count,
      users,
    });

    await db.end();
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const db = await dbConnection();
    const [[user]] = await db.query(`SELECT * FROM users WHERE id = '${id}'`);

    if (!user) throw new Error('El usuario no existe.');

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
  try {
    const db = await dbConnection();
    const [[userExists]] = await db.query(
      `SELECT * FROM users WHERE email = '${email}'`
    );

    if (userExists) throw new Error('El email ya está registrado.');

    const [[, [user]]] = await db.query(`
      INSERT INTO users (name, email) VALUES ('${name}', '${email}'); 
      SELECT * FROM users WHERE id = LAST_INSERT_ID()
    `);

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
  try {
    const db = await dbConnection();
    const [[user]] = await db.query(`SELECT * FROM users WHERE id = '${id}'`);

    if (!user) throw new Error('El usuario no existe.');

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

export const deleteAllUsers = async (_, res, next) => {
  try {
    const db = await dbConnection();
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
  try {
    const db = await dbConnection();
    const [[userExists]] = await db.query(
      `SELECT * FROM users WHERE id = '${id}'`
    );

    if (!userExists) throw new Error('El usuario no existe.');

    const [[emailExists]] = await db.query(
      `SELECT * FROM users WHERE email = '${email}'`
    );

    if (emailExists) throw new Error('El email ya está registrado.');

    const [[, [updateUser]]] = await db.query(`
      UPDATE users SET name = '${name}', email = '${email}' WHERE id = '${id}';
      SELECT * FROM users WHERE id = '${id}'
    `);

    res.json({
      ok: true,
      msg: 'Usuario actualizado correctamente.',
      user: updateUser,
    });

    await db.end();
  } catch (error) {
    next(error);
  }
};
