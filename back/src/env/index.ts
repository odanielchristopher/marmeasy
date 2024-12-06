type Env = {
    NODE_ENV: 'development' | 'test' | 'production';
    PORT: number;
};

const getEnv = (): Env => {
    const NODE_ENV = process.env.NODE_ENV as 'development' | 'test' | 'production' || 'development';
    const PORT = Number(process.env.PORT) || 3333;

    if (!['development', 'test', 'production'].includes(NODE_ENV)) {
        throw new Error('Invalid NODE_ENV value.');
    }

    if (isNaN(PORT)) {
        throw new Error('Invalid PORT value.');
    }

    return { NODE_ENV, PORT };
};

const env = getEnv();

export { env };