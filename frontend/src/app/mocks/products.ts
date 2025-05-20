import { IProduct } from '@app/entities/Product';

export const products: IProduct[] = [
  {
    id: String(Math.random()),
    imagePath:
      'https://images.unsplash.com/photo-1505576633757-0ac1084af824?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bHVuY2h8ZW58MHx8MHx8fDA%3D',
    name: 'Marmita Vegetariana',
    description:
      'Feita de lentilha e grãos de bico com cuscuz e queijo parmesão',
    price: 40,
  },
  {
    id: String(Math.random()),
    name: 'Marmita Grande',
    description: 'Marmita tradicional de 750ml',
    price: 45,
  },
  {
    id: String(Math.random()),
    name: 'Marmita Grande',
    imagePath:
      'https://images.unsplash.com/photo-1627309302198-09a50ae1b209?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGx1bmNofGVufDB8fDB8fHww',
    price: 45,
  },
  {
    id: String(Math.random()),
    imagePath:
      'https://images.unsplash.com/photo-1505576633757-0ac1084af824?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bHVuY2h8ZW58MHx8MHx8fDA%3D',
    name: 'Marmita Vegetariana',
    description:
      'Feita de lentilha e grãos de bico com cuscuz e queijo parmesão',
    price: 40,
  },
  {
    id: String(Math.random()),
    name: 'Marmita Grande',
    description: 'Marmita tradicional de 750ml',
    price: 45,
  },
  {
    id: String(Math.random()),
    name: 'Marmita Grande',

    price: 45,
  },
];
