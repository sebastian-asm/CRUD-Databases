import { ObjectId } from 'mongodb';

export default function validateId(req, _, next) {
  const { id } = req.params;
  try {
    if (!ObjectId.isValid(id))
      throw new Error('El id del usuario no es válido.');
    next();
  } catch (error) {
    next(error);
  }
}
