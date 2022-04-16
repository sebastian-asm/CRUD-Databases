import {
  addUser,
  deleteAllUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from '../controllers/index.js';
import emptyField from '../middlewares/emptyField.js';

export default function router(app) {
  app.get('/', getAllUsers);
  app.post('/', emptyField, addUser);
  app.delete('/', deleteAllUser);
  app.get('/:id', getUser);
  app.delete('/:id', deleteUser);
  app.put('/:id', emptyField, updateUser);
}
