import { ClientType, IClient } from '../clientEntity';
import { ClientsRepository} from '../ClientsRepository';

interface IInput {
  userId: string
};

interface IOutput {
    clients: Array<IClient>
}

export class GetAllClientsUseCase {
  constructor(private readonly getAllRepository: ClientsRepository) {}

  async execute({ userId }: IInput): Promise<IOutput> {
    const clients = await this.getAllRepository.getAll(userId);

    const mappedClients = clients.map(client => ({
      ...client,
      type: client.type as unknown as ClientType,
    }));

    return { clients: mappedClients };
  }
}