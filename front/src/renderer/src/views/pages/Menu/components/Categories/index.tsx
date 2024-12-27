import { Table } from '../Table';
import { Container, Header, Title } from './styles';

export default function Categories() {
  return (
    <Container>
      <Header>
        <div className='infos'>
          <Title>Categorias</Title>
          <span>0</span>
        </div>

        <button>
          Adicionar categoria
        </button>
      </Header>

      <Table.Container>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCollumn style={{ width: '5%' }} >Emoji</Table.HeaderCollumn>
            <Table.HeaderCollumn>Nome</Table.HeaderCollumn>
            <Table.HeaderCollumn style={{ width: '12%' }} >Ações</Table.HeaderCollumn>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell align='center'>🍕</Table.Cell>
            <Table.Cell>Pizzas</Table.Cell>
            <Table.Cell>
              <button>Editar</button>
              <button>Excluir</button>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell align='center'>🥩</Table.Cell>
            <Table.Cell>Carnes</Table.Cell>
            <Table.Cell>
              <button>Editar</button>
              <button>Excluir</button>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell align='center'>☕️</Table.Cell>
            <Table.Cell>Café</Table.Cell>
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
