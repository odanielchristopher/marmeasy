import { BiFoodMenu } from 'react-icons/bi';

import { Tabs } from '@renderer/views/components/Tabs';
import Categories from './components/Categories';
import Products from './components/Products';

import { SectionHeader } from '@renderer/views/components/SectionHeader';

import { Container, Main } from './styles';

export default function Menu() {
  return (
    <Container>
      <SectionHeader>
        <div>
          <BiFoodMenu size={32} />
          <h1>Cardápio</h1>
        </div>

        <p>Gerencie os produtos do seu estabelecimento</p>
      </SectionHeader>

      <Main>
        <Tabs.Root defaultValue="products">
          <Tabs.List>
            <Tabs.Trigger value="products" text="Produtos" />
            <Tabs.Trigger value="categories" text="Categorias" />
          </Tabs.List>

          <Tabs.Content value="products">
            <Products />
          </Tabs.Content>

          <Tabs.Content value="categories">
            <Categories />
          </Tabs.Content>
        </Tabs.Root>
      </Main>
    </Container>
  );
}
