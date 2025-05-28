export interface IProduct {
  id: string;
  name: string;
  price: number;
  description?: string;
  imagePath?: string;
  category?: {
    id: string;
    icon: string;
    name: string;
  };
}
