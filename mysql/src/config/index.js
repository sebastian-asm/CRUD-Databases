export const appConfig = {
  noMatchHandler: (_, res) => {
    res.status(404).json({
      ok: false,
      msg: 'Recurso no encontrado.',
    });
  },
  onError: (error, _, res) => {
    res.status(500).json({
      ok: false,
      msg: error.message,
    });
  },
};
