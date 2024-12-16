export interface IClient {
  id?:  string;
  name: string;
  userId: string;
  type: 'FISICO' | 'JURIDICO';
  phone?: string | undefined;
  address?: string | undefined;
  document?: string | undefined;
  balance?: number | undefined | string;
}
