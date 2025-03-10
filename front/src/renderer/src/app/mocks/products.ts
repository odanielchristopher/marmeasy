import { Product } from '../entities/Product';

export const products: Product[] = [
  {
    id: '48064cdd-e50f-4547-a39b-3d9a231b206d',
    name: 'Pão com ovo',
    description: 'Um pão feito na chapa.',
    price: 9.2,
    imagePath: 'uploads/21c24eb5-b115-491a-abd2-41f647792a0b-perfil.png',
    ingredients: [
      {
        id: '5635d882-0f13-4e78-802d-973b4bd31e0b',
        icon: '🍕',
        name: 'delte',
      },
      {
        id: 'e42e2e43-2c1d-4e91-87af-e76d173da6d1',
        icon: '🍕',
        name: 'pizza',
      },
    ],
    category: {
      id: '98d57110-22fc-409d-be29-bd9f0fee5d51',
      name: 'café',
      icon: '☕️',
    },
  },
  {
    id: '48064cdd-e50f-4547-a39b-3d9a231b20ad',
    name: 'Marmita grande',
    description: 'Marmita de 750ml.',
    price: 15.0,
    imagePath: 'uploads/21c24eb5-b115-491a-abd2-41f647792a0b-perfil.png',
    ingredients: [
      {
        id: '5635d882-0f13-4e78-802d-973b4bd31e0b',
        icon: '🍕',
        name: 'delte',
      },
      {
        id: 'e42e2e43-2c1d-4e91-87af-e76d173da6d1',
        icon: '🍕',
        name: 'pizza',
      },
    ],
    category: {
      id: '1211487d-2d3e-4b62-bab9-d9a44c8cd993',
      name: 'almoço',
      icon: '🧫',
    },
  },
  {
    id: '48064cdd-e50f-4547-a39b-3d9a23daw06d',
    name: 'Pizza de calabresa',
    description: 'Uma pizza gostosa.',
    price: 24.9,
    imagePath: 'uploads/21c24eb5-b115-491a-abd2-41f647792a0b-perfil.png',
    ingredients: [
      {
        id: '5635d882-0f13-4e78-802d-973b4bd31e0b',
        icon: '🍕',
        name: 'delte',
      },
      {
        id: 'e42e2e43-2c1d-4e91-87af-e76d173da6d1',
        icon: '🍕',
        name: 'pizza',
      },
    ],
    category: {
      id: '55a22584-872c-41b9-8486-a841cafe8384',
      name: 'pizza',
      icon: '🍕',
    },
  },
];
