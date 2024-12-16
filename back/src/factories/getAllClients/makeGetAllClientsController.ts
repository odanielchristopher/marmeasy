import { GetAllClientController } from '../../app/modules/clients/getAllClients/GetAllClientsControllers';
import { makeGetAllClientsUseCase } from './makeGetAllClientsUseCase';

export function makeGetAllClientsController() {
  const getAllClientsUseCase = makeGetAllClientsUseCase();

  return new GetAllClientController(getAllClientsUseCase);
}
