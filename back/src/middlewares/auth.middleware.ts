import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const authorization = req.headers.authorization;

    if (!authorization) {
        res.status(401).send({ error: 'Acesso negado, nenhum token fornecido.' });
        return;
    }

    try {
        const token = authorization.replace('Bearer ', '');
        const decoded = verify(token, process.env.JWT_SECRET as string) as { id: string };

        req.userId = decoded.id; 
        next(); 
    } catch (err) {
        console.error('Erro no middleware de autenticação:', err);
        res.status(400).send({ error: 'Token inválido.' });
    }
};