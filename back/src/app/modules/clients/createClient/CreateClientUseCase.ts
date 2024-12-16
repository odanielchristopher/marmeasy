import { ClientNotFound } from '../../../shared/errors/ClientNotFound';
import { ClientsRepository } from '../ClientsRepository';
import { ClientType } from '../clientEntity';

interface IInput {
    name: string;
    phone: string;
    address: string;
    type: ClientType;
    document: string;
    balance: number;
    userId: string;
}

interface IOutput {
    name: string;
    document: string;
  };

export class CreateClientUseCase {
    constructor(private readonly clientsRepository: ClientsRepository) {}
    async execute({ userId, name, phone, address, type, document, balance }: IInput): Promise<IOutput> {
        const client = await this.clientsRepository.findByDocument(document);
  
        if (client) {
            throw new ClientNotFound();
        }

        const newClient = await this.clientsRepository.create({
            name,
            phone,
            address,
            type,
            document,
            balance,
            user_id: userId,
        });

        return newClient;
    }
}