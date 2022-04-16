import {
  addUser,
  deleteAllUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from '../controllers/index.js';
import { emptyField, validateId } from '../middlewares/index.js';

export default function router(app) {
  app.get('/', getAllUsers);
  app.post('/', emptyField, addUser);
  app.delete('/', deleteAllUser);
  app.get('/:id', validateId, getUser);
  app.delete('/:id', validateId, deleteUser);
  app.put('/:id', validateId, emptyField, updateUser);
}
