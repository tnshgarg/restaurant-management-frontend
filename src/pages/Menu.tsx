import React, { useState, useMemo } from 'react';
import { useStore } from '../store/useStore';
import { MenuItem } from '../types';
import { Minus, Plus, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ITEMS_PER_PAGE = 100;

const MOCK_MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Margherita Pizza',
    description: 'Fresh tomatoes, mozzarella, basil, and olive oil',
    price: 12.99,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3',
    available: true,
    customizations: [
      {
        type: 'Size',
        options: [
          { name: 'Regular', price: 0 },
          { name: 'Large', price: 4 },
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'Pepperoni Supreme',
    description: 'Double pepperoni, extra cheese, and our special herb-infused tomato sauce',
    price: 14.99,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e',
    available: true,
    customizations: [
      {
        type: 'Size',
        options: [
          { name: 'Regular', price: 0 },
          { name: 'Large', price: 4 },
        ],
      },
    ],
  },
  
  // Add more menu items as needed
];

const Menu: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { addToCart, cart, updateQuantity, removeFromCart } = useStore();
  const navigate = useNavigate();

  const categories = ['all', ...new Set(MOCK_MENU_ITEMS.map(item => item.category))];

  const filteredItems = useMemo(() => {
    let items = MOCK_MENU_ITEMS;

    // Apply category filter
    if (selectedCategory !== 'all') {
      items = items.filter(item => item.category === selectedCategory);
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      items = items.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      );
    }

    return items;
  }, [selectedCategory, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getItemQuantity = (itemId: string) => {
    const cartItem = cart.find(item => item.id === itemId);
    return cartItem?.quantity || 0;
  };

  const totalItemsInCart = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleQuantityChange = (item: MenuItem, change: number) => {
    const currentQuantity = getItemQuantity(item.id);
    const newQuantity = currentQuantity + change;

    if (newQuantity === 0) {
      removeFromCart(item.id);
    } else if (currentQuantity === 0 && change > 0) {
      addToCart(item, []);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Categories Section */}
      <div className="sticky top-0 bg-gray-50 pt-4 pb-6 shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Our Menu</h1>
          
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search menu..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Categories */}
          <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="max-w-7xl mx-auto px-4">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No items found matching your criteria</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedItems.map((item) => {
                const quantity = getItemQuantity(item.id);
                
                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-48 object-cover"
                      />
                      {!item.available && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <span className="text-white font-medium px-3 py-1 rounded-full bg-red-500">
                            Out of Stock
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                          {item.name}
                        </h3>
                        <span className="text-indigo-600 font-medium whitespace-nowrap ml-2">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {item.description}
                      </p>
                      {item.available ? (
                        quantity > 0 ? (
                          <div className="flex items-center justify-center space-x-4">
                            <button
                              onClick={() => handleQuantityChange(item, -1)}
                              className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                            >
                              <Minus className="w-5 h-5 text-indigo-600" />
                            </button>
                            <span className="font-medium text-lg w-8 text-center">
                              {quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item, 1)}
                              className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                            >
                              <Plus className="w-5 h-5 text-indigo-600" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleQuantityChange(item, 1)}
                            className="w-full py-2 px-4 rounded-md text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                          >
                            Add to Cart
                          </button>
                        )
                      ) : (
                        <button
                          disabled
                          className="w-full py-2 px-4 rounded-md text-sm font-medium bg-gray-200 text-gray-500 cursor-not-allowed"
                        >
                          Out of Stock
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-4 mt-8 pb-8">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {totalItemsInCart > 0 && (
        <div className="fixed bottom-0 inset-x-0 bg-indigo-600 text-white py-3 px-4 flex justify-between items-center z-50 shadow-lg md:hidden">
          <div className="text-sm font-medium">
            {totalItemsInCart} item{totalItemsInCart > 1 && 's'} in your cart
          </div>
          <button
            className="bg-white text-indigo-600 px-4 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition"
            onClick={() => {
              navigate("/cart")
            }}
          >
            View Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default Menu;