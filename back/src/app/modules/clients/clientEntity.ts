export enum ClientType {
    FISICO = 'FISICO',
    JURIDICO = 'JURIDICO'
}

export interface IClient {
    id?: string;
    user_id: string;
    name: string;
    phone: string;
    address: string;
    type: ClientType;
    document: string;
    balance?: number;
}
