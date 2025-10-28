import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cfsupportRoutes from './routes/cfsupport.routes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { initializeDatabase } from './config/init-db.js';

// Carregar variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Inicializar banco de dados
await initializeDatabase();

// Middlewares
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logs básicos
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Rotas
app.get('/', (req, res) => {
  res.json({ 
    message: 'API CF Support',
    version: '1.0.0',
    endpoints: {
      cfsupport: '/api/cfsupport'
    }
  });
});

app.use('/api/cfsupport', cfsupportRoutes);

// Middleware de erro
app.use(errorHandler);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📡 Endpoint: http://localhost:${PORT}`);
});

export default app;

