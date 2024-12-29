
import { BiFoodMenu } from 'react-icons/bi';

import { Tabs } from '@renderer/views/components/Tabs';
import Categories from './components/Categories';
import Products from './components/Products';

import { Container, Header, Main } from './styles';

export default function Menu() {
  return (
    <Container>
      <Header>
        <div>
          <BiFoodMenu size={32}/>
          <h1>Cardápio</h1>
        </div>

        <p>
          Gerencie os produtos do seu estabelecimento
        </p>
      </Header>

      <Main>
        <Tabs.Root defaultValue='products'>
          <Tabs.List>
            <Tabs.Trigger
              value='products'
              text='Produtos'
            />
            <Tabs.Trigger
              value='categories'
              text='Categorias'
            />
          </Tabs.List>

          <Tabs.Content value='products' >
            <Products />
          </Tabs.Content>

          <Tabs.Content value='categories' >
            <Categories />
          </Tabs.Content>
        </Tabs.Root>
      </Main>
    </Container>
  );
}
