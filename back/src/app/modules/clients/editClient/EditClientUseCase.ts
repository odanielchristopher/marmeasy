import { $Enums } from '@prisma/client';
import { ClientType } from '../clientEntity';
import { ClientsRepository } from '../ClientsRepository';
import { ClientNotFound } from '../../../shared/errors/ClientNotFound';
import { DocumentError } from '../../../shared/errors/DocumentError';

interface IInput {
    id: string;
    userId: string;
    name?: string;
    phone?: string;
    address?: string;
    type?: $Enums.ClientType;
    document?: string;
    balance?: number;
}

interface IOutput {
    id: string;
    user_id: string;
    name: string;
    phone: string;
    address: string;
    type: $Enums.ClientType;
    document: string;
    balance: number;
}

export class EditClientUseCase {
    constructor(private readonly clientsRepository: ClientsRepository) {}

    async execute({ id, userId, ...updateFields}: IInput): Promise<IOutput> {
        const client = await this.clientsRepository.findById(id, userId);

        if (!client) {
            throw new ClientNotFound();
        }

        if(updateFields.document) {
        const checkClientDocument =  await this.clientsRepository.findByDocument(updateFields.document);
            if (checkClientDocument) {
                throw new DocumentError('Error ao atualizar documento.');
            }
        }

        Object.keys(updateFields).forEach((key) => {
            const field = key as keyof typeof updateFields;

            if (updateFields[field] !== undefined) {
                (client as any)[field] = updateFields[field];
            }
        });

        await this.clientsRepository.update(id, userId,{
            ...client,
            type: client.type as ClientType,
        });

        return {
                id: client.id,
                user_id: client.user_id,
                name: client.name,
                phone: client.phone,
                address: client.address,
                type: client.type as ClientType,
                document: client.document,
                balance: client.balance,
        };
    }
}