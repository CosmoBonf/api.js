-- Tabela de suporte CF
CREATE TABLE IF NOT EXISTS cfsupport (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'open',
    priority VARCHAR(20) DEFAULT 'medium',
    user_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_cfsupport_status ON cfsupport(status);
CREATE INDEX IF NOT EXISTS idx_cfsupport_priority ON cfsupport(priority);
CREATE INDEX IF NOT EXISTS idx_cfsupport_user_id ON cfsupport(user_id);
CREATE INDEX IF NOT EXISTS idx_cfsupport_created_at ON cfsupport(created_at);

-- Inserir alguns dados de exemplo
INSERT INTO cfsupport (title, description, status, priority, user_id) 
VALUES 
    ('Problema de conexão', 'Sistema não conecta ao banco de dados', 'open', 'high', 1),
    ('Bug no login', 'Usuário não consegue fazer login', 'in_progress', 'medium', 2),
    ('Melhoria solicitada', 'Adicionar filtro de busca', 'closed', 'low', 1);

