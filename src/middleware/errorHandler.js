export const errorHandler = (err, req, res, next) => {
  console.error('Erro:', err);

  // Erro de validação do PostgreSQL
  if (err.code === '23505') {
    return res.status(409).json({
      error: 'Conflito: registro duplicado',
      details: err.detail
    });
  }

  if (err.code === '23503') {
    return res.status(400).json({
      error: 'Erro de integridade referencial',
      details: err.detail
    });
  }

  if (err.code === '23502') {
    return res.status(400).json({
      error: 'Dados obrigatórios não fornecidos',
      details: err.detail
    });
  }

  // Erro genérico
  res.status(err.status || 500).json({
    error: err.message || 'Erro interno do servidor',
    status: err.status || 500
  });
};

