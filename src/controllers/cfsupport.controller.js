import pool from '../config/database.js';

export const getAllSupport = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const result = await pool.query(
      'SELECT * FROM cfsupport ORDER BY id DESC LIMIT $1 OFFSET $2',
      [limit, offset]
    );

    const countResult = await pool.query('SELECT COUNT(*) FROM cfsupport');
    const total = parseInt(countResult.rows[0].count);

    res.json({
      data: result.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getSupportById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'SELECT * FROM cfsupport WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ 
        error: 'Suporte não encontrado' 
      });
    }

    res.json({ data: result.rows[0] });
  } catch (error) {
    next(error);
  }
};

export const createSupport = async (req, res, next) => {
  try {
    const { title, description, status, priority, user_id } = req.body;

    // Validação básica
    if (!title || !description) {
      return res.status(400).json({
        error: 'Título e descrição são obrigatórios'
      });
    }

    const result = await pool.query(
      `INSERT INTO cfsupport (title, description, status, priority, user_id, created_at)
       VALUES ($1, $2, $3, $4, $5, NOW())
       RETURNING *`,
      [
        title,
        description,
        status || 'open',
        priority || 'medium',
        user_id
      ]
    );

    res.status(201).json({ 
      message: 'Suporte criado com sucesso',
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

export const updateSupport = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority, user_id } = req.body;

    const result = await pool.query(
      `UPDATE cfsupport
       SET title = COALESCE($1, title),
           description = COALESCE($2, description),
           status = COALESCE($3, status),
           priority = COALESCE($4, priority),
           user_id = COALESCE($5, user_id),
           updated_at = NOW()
       WHERE id = $6
       RETURNING *`,
      [title, description, status, priority, user_id, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ 
        error: 'Suporte não encontrado' 
      });
    }

    res.json({ 
      message: 'Suporte atualizado com sucesso',
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSupport = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM cfsupport WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ 
        error: 'Suporte não encontrado' 
      });
    }

    res.json({ 
      message: 'Suporte deletado com sucesso'
    });
  } catch (error) {
    next(error);
  }
};

