export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  available: boolean;
  customizations?: {
    type: string;
    options: {
      name: string;
      price: number;
    }[];
  }[];
}

export interface CartItem extends MenuItem {
  quantity: number;
  customizations: {
    type: string;
    selected: string;
    extraPrice: number;
  }[];
}

export interface Restaurant {
  id: string;
  name: string;
  table: string;
}

export type OrderStatus = 'pending' | 'received' | 'preparing' | 'ready' | 'completed';