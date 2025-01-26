import { useState } from 'react';
import { Client } from '@renderer/app/entities/Client';
import { Input } from '@renderer/views/components/Input';
import { useProductCategoriesQuery } from '@renderer/app/hooks/queries/useProductCategoriesQuery';
import { useProductsQuery } from '@renderer/app/hooks/queries/useProductsQuery';
import { Container, IconCategory, ProductList } from './styles';
import { ProductCategory } from '@renderer/app/entities/ProductCategory';
import { formatCurrency } from '@renderer/app/utils/formatCurrency';
import noImage from '@renderer/assets/Images/empty-image.svg';
import Plus from '@renderer/assets/Images/Plus.svg';

interface AddOrderProps {
  client: Client | null;
}

export default function AddOrder({ client }: AddOrderProps) {
  const { categories, isLoading } = useProductCategoriesQuery();
  const { products } = useProductsQuery();
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>();
  // const [clientName, setClientName] = useState(client?.name || '');
  const [orderDate, setOrderDate] = useState('');

  return (
    <Container>
      <header>
        <p>
          Adicionar Pedido ao cliente <strong>{client?.name}</strong>{' '}
        </p>
      </header>
      {/* <Input
                type="text"
                // value={client?.name}
                value={clientName}
                placeholder="Nome do cliente*"
                name='name'
                onChange={(e) => setClientName(e.target.value)}
             /> */}

      <Input
        type="date"
        placeholder="Data do pedido*"
        name="OrderDate"
        onChange={(e) => setOrderDate(e.target.value)}
      />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <footer>
          <ul className="categoriesOptions">
            {categories.map((category) => (
              <IconCategory
                key={category.id}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory?.id === category.id ? 'active' : ''}
              >
                <div className="circle">{category.icon}</div>
                <p>{category.name}</p>
              </IconCategory>
            ))}
          </ul>
          <ul className="productsOptions">
            {selectedCategory &&
              products
                .filter(
                  (product) => product.category.id === selectedCategory.id,
                )
                .map((product) => {
                  const imagePath =
                    product.imagePath &&
                    `${import.meta.env.VITE_API_URL}/${product.imagePath}`;
                  return (
                    <ProductList key={product.id}>
                      {product.imagePath ? (
                        <img src={imagePath} />
                      ) : (
                        <img src={noImage} alt="No image" />
                      )}
                      <div className="infos">
                        <strong>{product.name}</strong>
                        <span>{product.description}</span>
                        <div className="footer">
                          <strong>R$ {formatCurrency(product.price)}</strong>
                          <img src={Plus} alt="Adicionar" />
                        </div>
                      </div>
                    </ProductList>
                  );
                })}
          </ul>
        </footer>
      )}
    </Container>
  );
}
