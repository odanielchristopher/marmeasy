import { Client } from '@prisma/client';
import { IClient } from '../../modules/clients/clientEntity';

class ClientMapper {
  toDomain(persistenceClient: Client): IClient {
    return {
      id: persistenceClient.id,
      userId: persistenceClient.user_id,
      name: persistenceClient.name,
      phone: persistenceClient.phone || undefined,
      address: persistenceClient.address || undefined,
      type: persistenceClient.type === 'FISICO' ? 'FISICO' : 'JURIDICO',
      document: persistenceClient.document || '',
      balance: persistenceClient.balance || undefined,
    };
  }
}

export default new ClientMapper();
