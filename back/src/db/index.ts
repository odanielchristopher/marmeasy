import { Pool } from 'pg';

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'root',
  password: 'root',
  database: 'marmeasy'
});

// Conexão ao banco de dados
pool.connect().catch((err) => {
  console.error('Error connecting to the database:', err);
  process.exit(1); // Encerra o processo em caso de erro
});

async function query<T>(queryText: string, values?: any[]): Promise<T[]> {
  const { rows } = await pool.query(queryText, values);
  return rows;
}

// Exporta função de consulta
export default {
  query
};
