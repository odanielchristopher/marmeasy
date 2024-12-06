import { Request, Response } from 'express';
import { pool } from '../../db';
import bcrypt from 'bcryptjs';

export async function register(req: Request, res: Response) {
        try {
            // eslint-disable-next-line no-console
            console.log(process.env.DB_NAME);
            const { email, password, name } = req.body;

            if (!email || !password || !name) {
                res.status(400).send({ error: 'Dados insuficientes.' });
                return;
            }

            const client = await pool.connect();

            try {
                const emailCheck = await client.query('SELECT * FROM users WHERE email = $1', [email]);

                if (emailCheck.rows.length > 0) {
                    res.status(400).send({ error: 'Email já está em uso.' });
                    return;
                }

                const hashedPassword = await bcrypt.hash(password, 6);

                const result = await client.query(
                    'INSERT INTO users (id, name, email, password, created_at) VALUES (uuid_generate_v4(), $1, $2, $3, NOW()) RETURNING id, name, email',
                    [name, email, hashedPassword]
                );

                const newUser = result.rows[0];
                res.status(201).send({ user: newUser });
            } finally {
                client.release();
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Erro ao registrar usuário:', error);
            res.status(500).send({ error: 'Erro interno ao registrar o usuário.' });
        }
}

