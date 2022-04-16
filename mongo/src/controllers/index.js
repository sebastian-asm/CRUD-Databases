import { ObjectId } from 'mongodb';

import { client } from '../db/dbConnection.js';

const db = client.db('local');
const collection = db.collection('users');

export const getAllUsers = async (_, res, next) => {
  try {
    await client.connect();
    const [users, count] = await Promise.all([
      collection.find().toArray(),
      collection.countDocuments(),
    ]);

    res.json({
      ok: true,
      msg: 'Listado de todos los usuarios.',
      count,
      users,
    });
  } catch (error) {
    next(error);
  } finally {
    await client.close();
  }
};

export const getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    await client.connect();
    const user = await collection.findOne({ _id: ObjectId(id) });
    if (!user) throw new Error('El usuario no existe.');

    res.json({
      ok: true,
      msg: 'Información del usuario.',
      user,
    });
  } catch (error) {
    next(error);
  } finally {
    await client.close();
  }
};

export const addUser = async (req, res, next) => {
  const { name, email } = req.body;
  try {
    await client.connect();
    const userExists = await collection.findOne({ email });
    if (userExists) throw new Error('El email ya está registrado.');

    const { insertedId } = await collection.insertOne({
      name,
      email,
      createdAt: Date.now(),
    });

    res.status(201).json({
      ok: true,
      msg: 'Usuario creado correctamente.',
      user: {
        id: insertedId,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    await client.close();
  }
};

export const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    await client.connect();
    const { value } = await collection.findOneAndDelete({ _id: ObjectId(id) });
    if (!value) throw new Error('El usuario no existe.');

    res.json({
      ok: true,
      msg: 'Usuario eliminado correctamente.',
    });
  } catch (error) {
    next(error);
  } finally {
    await client.close();
  }
};

export const deleteAllUser = async (_, res, next) => {
  try {
    await client.connect();
    await collection.deleteMany({});

    res.json({
      ok: true,
      msg: 'Todos los usuarios eliminados.',
    });
  } catch (error) {
    next(error);
  } finally {
    await client.close();
  }
};

export const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    await client.connect();
    const emailExists = await collection.findOne({ email });
    if (emailExists) throw new Error('El email ya está registrado.');

    const { value } = await collection.findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: { name, email } },
      { returnDocument: 'after' }
    );

    if (!value) throw new Error('El usuario no existe.');

    res.json({
      ok: true,
      msg: 'Usuario actualizado correctamente.',
      user: value,
    });
  } catch (error) {
    next(error);
  } finally {
    await client.close();
  }
};
