import {
  addUser,
  deleteAllUsers,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from '../controllers/index.js';
import emptyField from '../middlewares/emptyField.js';

export default function router(app) {
  app.get('/', getAllUsers);
  app.post('/', emptyField, addUser);
  app.delete('/', deleteAllUsers);
  app.get('/:id', getUser);
  app.delete('/:id', deleteUser);
  app.put('/:id', emptyField, updateUser);
}
