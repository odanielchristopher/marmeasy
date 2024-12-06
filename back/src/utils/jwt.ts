import { sign } from 'jsonwebtoken';

export function generateToken(payload: { id: string | number }): string {
    const secret = process.env.JWT_SECRET as string;
    const expiresIn = '30d';

    const token = sign({ id: payload.id }, secret, { expiresIn });

    return token;
};