import React, { useEffect } from 'react';
import { useStore } from '../store/useStore';

interface RestaurantProviderProps {
  children: React.ReactNode;
}

const RestaurantProvider: React.FC<RestaurantProviderProps> = ({ children }) => {
  const setRestaurant = useStore((state) => state.setRestaurant);

  useEffect(() => {
    // In a real app, we would parse the QR code data from the URL
    // For demo purposes, we'll set a mock restaurant
    const mockRestaurant = {
      id: '123',
      name: 'The Grand Kitchen',
      table: 'A12',
    };
    setRestaurant(mockRestaurant);
  }, [setRestaurant]);

  return <>{children}</>;
}

export default RestaurantProvider;