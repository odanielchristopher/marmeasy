import { ClientType } from '../clientEntity';
import { ClienNotFound } from '../../../shared/errors/ClientNotFound';
import { ClientsRepository } from '../ClientsRepository';

interface IInput {
    id: string,
    userId: string
}
  
interface IOutput {
    id: string;
    user_id: string;
    name: string;
    phone: string;
    address: string;
    type: ClientType;
    document: string;
    balance: number;
}

export class FindClientUseCase {
    constructor(private readonly clientsRepository: ClientsRepository) {}
    
    async execute({ id, userId }: IInput): Promise<IOutput> {
        const client = await this.clientsRepository.findById(id, userId);

        if (!client) {
            throw new ClienNotFound();
        }

        return client as IOutput;
    }
}