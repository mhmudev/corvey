export type TProductItem = {
  _id: string;
  sizes: string[];
  colors: string[];
  description: string;
  quantity: number;
  price: number;
  title: string;
  images: string[];
  discount: number;
  slug: string;
};

export type TCartItem = {
  id: string;
  productId: string;
  title: string;
  price: number;
  size: string;
  quantity: number;
  image: string;
  color: string;
  discount: number;
};
