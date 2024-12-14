declare namespace Express {
  interface Request {
    metadata: {
      userId: string;
    }
  }
}
