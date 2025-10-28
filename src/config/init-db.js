import pool from './database.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const initializeDatabase = async (retries = 10, delay = 3000) => {
  for (let i = 0; i < retries; i++) {
    try {
      console.log(`📊 Inicializando banco de dados... (tentativa ${i + 1}/${retries})`);
      
      // Verificar se a tabela já existe
      const checkTable = await pool.query(`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_name = 'cfsupport'
        );
      `);

      if (checkTable.rows[0].exists) {
        console.log('✅ Tabela cfsupport já existe');
        return;
      }

      console.log('📝 Criando tabela cfsupport...');
      
      const schemaPath = path.join(__dirname, '../../database/schema.sql');
      const schema = fs.readFileSync(schemaPath, 'utf8');
      
      await pool.query(schema);
      
      console.log('✅ Banco de dados inicializado com sucesso!');
      return;
    } catch (error) {
      if (i === retries - 1) {
        console.error('❌ Erro ao inicializar banco de dados após todas as tentativas:', error);
        throw error;
      }
      console.log(`⚠️  Tentativa ${i + 1} falhou, aguardando ${delay}ms...`);
      await sleep(delay);
    }
  }
};

