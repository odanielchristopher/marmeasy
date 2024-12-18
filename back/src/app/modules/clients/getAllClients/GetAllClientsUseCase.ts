import ClientMapper from '../../../shared/mappers/ClientMapper';
import { IClient } from '../clientEntity';
import { ClientsRepository } from '../ClientsRepository';

interface IInput {
  userId: string;
}
export class GetAllClientsUseCase {
  constructor(private readonly getAllRepository: ClientsRepository) {}

  async execute({ userId }: IInput): Promise<IClient[]> {
    // Prisma me devolve um objeto com os valores.
    const clientsObject= await this.getAllRepository.getAll(userId);

    const clients = Object.values(clientsObject);

   // Ordena pelo nome em ordem alfabética
    const sortedClients = clients.sort((a, b) => a.name.localeCompare(b.name));

    // Devolvendo um array mapeado
    return sortedClients.map((client) => ClientMapper.toDomain(client));
  }
}
