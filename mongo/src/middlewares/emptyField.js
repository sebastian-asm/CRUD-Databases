export default function emptyField(req, _, next) {
  try {
    const emptyField = Object.values(req.body).some(
      (field) => field.trim() === ''
    );

    if (emptyField) throw new Error('Por favor, complete todos los campos.');

    next();
  } catch (error) {
    next(error);
  }
}
