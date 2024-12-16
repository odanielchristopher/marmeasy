import { ClientNotFound } from '../../../shared/errors/ClientNotFound';
import { ClientsRepository } from '../ClientsRepository';

interface IInput {
    id: string,
    userId: string
}
  
interface IOutput {
    message: string;
}

export class DeleteClientUseCase {
    constructor(private readonly clientsRepository: ClientsRepository) {}
    
    async execute({ id, userId }: IInput): Promise<IOutput>{
        const client = await this.clientsRepository.findById(id, userId);

        if (!client) {
            throw new ClientNotFound();
        }

        this.clientsRepository.delete(id, userId);

        return {
            message: 'Client deleted successfully.',
        };
    }
}