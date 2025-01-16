import { create } from 'zustand';
import { CartItem, MenuItem, Restaurant } from '../types';

interface State {
  restaurant: Restaurant | null;
  cart: CartItem[];
  orderStatus: string;
  addToCart: (item: MenuItem, customizations: any[]) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  setRestaurant: (restaurant: Restaurant) => void;
  setOrderStatus: (status: string) => void;
}

export const useStore = create<State>((set) => ({
  restaurant: null,
  cart: [],
  orderStatus: 'pending',
  
  setRestaurant: (restaurant) => set({ restaurant }),
  
  addToCart: (item, customizations) =>
    set((state) => {
      const existingItem = state.cart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return {
          cart: state.cart.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          ),
        };
      }
      return {
        cart: [...state.cart, { ...item, quantity: 1, customizations }],
      };
    }),
    
  removeFromCart: (itemId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== itemId),
    })),
    
  updateQuantity: (itemId, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      ),
    })),
    
  clearCart: () => set({ cart: [] }),
  
  setOrderStatus: (status) => set({ orderStatus: status }),
}));