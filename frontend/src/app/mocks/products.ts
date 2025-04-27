import { IProduct } from '@app/entities/IProduct';

export const products: IProduct[] = [
  {
    id: String(Math.random()),
    imagePath: 'https://github.com/odanielchristopher.png',
    name: 'Quatro Queijos',
    description: 'Pizza de Quatro Queijos com borda tradicional',
    price: 40,
  },
  {
    id: String(Math.random()),
    name: 'Frango com Catupiry',
    description: 'Pizza de Frango com Catupiry e borda tradicional',
    price: 45,
  },
  {
    id: String(Math.random()),
    name: 'Frango com Catupiry',

    price: 45,
  },
];
