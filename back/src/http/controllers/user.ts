import { Request, Response } from 'express';
import { pool } from '../../db';
import bcrypt from 'bcryptjs';


export async function getUser(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const client = await pool.connect();

            try {
                const result = await client.query('SELECT id, email FROM users WHERE id = $1', [id]);
                const user = result.rows[0];
                if (!user) {
                    res.status(404).send({ error: 'Usuário não encontrado.' });
                    return;
                }
                res.status(200).send({ user });
            } finally {
                client.release();
            }
        } catch (error) {
            console.log(error);
            res.status(400).send({ error: 'Falha ao obter o usuário.' });
        }
    }

export async function updateUser(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { email, password } = req.body;
            
            if (!id || !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id)) {
                res.status(400).send({ error: 'ID inválido.' });
                return;
            }

            const client = await pool.connect();
            try {
                const hashedPassword = password ? await bcrypt.hash(password, 6) : undefined;
                const result = await client.query(
                    'UPDATE users SET email = $1, password = COALESCE($2, password) WHERE id = $3 RETURNING id, email',
                    [email, hashedPassword, id]
                );
                const updatedUser = result.rows[0];
                if (!updatedUser) {
                    res.status(404).send({ error: 'Usuário não encontrado.' });
                }
                res.status(200).send({ user: updatedUser });
            } finally {
                client.release();
            }
        } catch (error) {
             
            console.log(error);
            res.status(400).send({ error: 'Falha ao atualizar o usuário.' });
        }
    }

 export async function deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const client = await pool.connect();
            try {
                const result = await client.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
                const deletedUser = result.rows[0];
                if (!deletedUser) {
                    res.status(404).send({ error: 'Usuário não encontrado.' });
                }
                res.status(200).send({ message: 'Usuário deletado com sucesso.' });
            } finally {
                client.release();
            }
        } catch (error) {
             
            console.log(error);
            res.status(400).send({ error: 'Falha ao deletar o usuário.' });
        }
}
