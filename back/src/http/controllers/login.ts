import { Request, Response } from 'express';
import { pool } from '../../db';
import bcrypt from 'bcryptjs';
import { generateToken } from '../../utils/jwt';

export async function login(req: Request, res: Response): Promise<void> {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).send({ error: 'Dados insuficientes.' });
            return;
        }

        const client = await pool.connect();

        try {
            const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
            const user = result.rows[0];

            if (!user) {
                res.status(400).send({ error: 'Usuário não encontrado.' });
                return; 
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                res.status(400).send({ error: 'Senha inválida.' });
                return;
            }

            const token = generateToken({ id: user.id });

            res.status(200).send({ token }); 
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Erro ao processar o login:', error);
        res.status(500).send({ error: 'Erro interno ao processar o login.' });
    }
}
