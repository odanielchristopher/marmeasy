import { Table } from '../Table';

import { Container, Header, Title } from './styles';

export default function Produtos() {
  return (
    <Container>
      <Header>
        <div className="infos">
          <Title>Produtos</Title>
          <span>0</span>
        </div>

        <button>Adicionar produto</button>
      </Header>

      <Table.Container>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCollumn>Imagem</Table.HeaderCollumn>
            <Table.HeaderCollumn>Nome</Table.HeaderCollumn>
            <Table.HeaderCollumn>Categoria</Table.HeaderCollumn>
            <Table.HeaderCollumn>Preço</Table.HeaderCollumn>
            <Table.HeaderCollumn style={{ width: '12%' }}>Ações</Table.HeaderCollumn>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Imagem 1</Table.Cell>
            <Table.Cell>Calabresa</Table.Cell>
            <Table.Cell>🍕 Pizzas</Table.Cell>
            <Table.Cell>R$ 12,00</Table.Cell>
            <Table.Cell>
              <button>Editar</button>
              <button>Excluir</button>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Container>
    </Container>
  );
}
