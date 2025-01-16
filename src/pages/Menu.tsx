import React, { useState, useMemo } from 'react';
import { useStore } from '../store/useStore';
import { MenuItem } from '../types';
import { Minus, Plus, Search, ChevronLeft, ChevronRight } from 'lucide-react';

const ITEMS_PER_PAGE = 12;

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
  // Pasta
  {
    id: '3',
    name: 'Fettuccine Alfredo',
    description: 'Creamy parmesan sauce with perfectly cooked fettuccine pasta',
    price: 13.99,
    category: 'Pasta',
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a',
    available: true,
    customizations: [
      {
        type: 'Add-ons',
        options: [
          { name: 'Grilled Chicken', price: 3 },
          { name: 'Shrimp', price: 4 },
        ],
      },
    ],
  },
  {
    id: '4',
    name: 'Spaghetti Bolognese',
    description: 'Classic meat sauce made with premium ground beef and fresh herbs',
    price: 12.99,
    category: 'Pasta',
    image: 'https://images.unsplash.com/photo-1622973536968-3ead9e780960',
    available: true,
  },
  // Salads
  {
    id: '5',
    name: 'Caesar Salad',
    description: 'Crisp romaine lettuce, parmesan cheese, croutons, and our house-made Caesar dressing',
    price: 9.99,
    category: 'Salads',
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9',
    available: true,
  },
  {
    id: '6',
    name: 'Greek Salad',
    description: 'Fresh cucumbers, tomatoes, olives, feta cheese with olive oil dressing',
    price: 10.99,
    category: 'Salads',
    image: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082',
    available: true,
  },
  // Burgers
  {
    id: '7',
    name: 'Classic Cheeseburger',
    description: 'Angus beef patty, cheddar cheese, lettuce, tomato, and our special sauce',
    price: 11.99,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
    available: true,
    customizations: [
      {
        type: 'Add-ons',
        options: [
          { name: 'Bacon', price: 2 },
          { name: 'Extra Cheese', price: 1 },
        ],
      },
    ],
  },
  {
    id: '8',
    name: 'Mushroom Swiss Burger',
    description: 'Sautéed mushrooms, Swiss cheese, caramelized onions on a brioche bun',
    price: 13.99,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5',
    available: false,
  },
  // Desserts
  {
    id: '9',
    name: 'Tiramisu',
    description: 'Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream',
    price: 7.99,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9',
    available: true,
  },
  {
    id: '10',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with a molten center, served with vanilla ice cream',
    price: 8.99,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51',
    available: true,
  },
  // Beverages
  {
    id: '11',
    name: 'Fresh Lemonade',
    description: 'Freshly squeezed lemons with just the right amount of sweetness',
    price: 3.99,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859',
    available: true,
    customizations: [
      {
        type: 'Size',
        options: [
          { name: 'Regular', price: 0 },
          { name: 'Large', price: 1 },
        ],
      },
    ],
  },
  {
    id: '12',
    name: 'Iced Coffee',
    description: 'Cold-brewed coffee served over ice with your choice of milk',
    price: 4.99,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735',
    available: true,
    customizations: [
      {
        type: 'Add-ons',
        options: [
          { name: 'Extra Shot', price: 1 },
          { name: 'Flavored Syrup', price: 0.5 },
        ],
      },
    ],
  },
  // Appetizers
  {
    id: '13',
    name: 'Garlic Bread',
    description: 'Freshly baked bread with garlic butter and herbs',
    price: 5.99,
    category: 'Appetizers',
    image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c',
    available: true,
  },
  {
    id: '14',
    name: 'Mozzarella Sticks',
    description: 'Crispy breaded mozzarella served with marinara sauce',
    price: 6.99,
    category: 'Appetizers',
    image: 'https://images.unsplash.com/photo-1531749668029-257f2a5b93f8',
    available: true,
  },
  // Sides
  {
    id: '15',
    name: 'Sweet Potato Fries',
    description: 'Crispy sweet potato fries seasoned with sea salt',
    price: 4.99,
    category: 'Sides',
    image: 'https://images.unsplash.com/photo-1604182667775-44f47c88dbd5',
    available: true,
  },
  {
    id: '16',
    name: 'Onion Rings',
    description: 'Beer-battered onion rings with our signature dipping sauce',
    price: 5.99,
    category: 'Sides',
    image: 'https://images.unsplash.com/photo-1639024471283-03518883512d',
    available: true,
  },
  // Add more menu items as needed
];

const Menu: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { addToCart, cart, updateQuantity, removeFromCart } = useStore();

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
    </div>
  );
};

export default Menu;