import { Client } from '@renderer/app/entities/Client';
import { Container } from './styles';

import edit from '@renderer/assets/Images/Edit.svg';

interface DetailsOrderProps {
    client: Client | null
}

export default function DetailsOrder( { client }: DetailsOrderProps ) {
    return (
        <Container>
            <header>
                <p>Detalhes do pedido</p>
                <img src={edit} alt="Edit" />
            </header>
            {client?.name}
        </Container>
    )
}