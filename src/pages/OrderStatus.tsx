import React, { useEffect } from 'react';
import { useStore } from '../store/useStore';
import { Clock, CheckCircle2, ChefHat, Bell } from 'lucide-react';

const OrderStatus: React.FC = () => {
  const { orderStatus, setOrderStatus } = useStore();

  useEffect(() => {
    // Simulate order status updates
    const statuses = ['received', 'preparing', 'ready', 'completed'];
    let currentIndex = statuses.indexOf(orderStatus);

    const interval = setInterval(() => {
      if (currentIndex < statuses.length - 1) {
        currentIndex++;
        setOrderStatus(statuses[currentIndex]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [orderStatus, setOrderStatus]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'received':
        return <Clock className="w-8 h-8 text-indigo-600" />;
      case 'preparing':
        return <ChefHat className="w-8 h-8 text-indigo-600" />;
      case 'ready':
        return <Bell className="w-8 h-8 text-indigo-600" />;
      case 'completed':
        return <CheckCircle2 className="w-8 h-8 text-green-600" />;
      default:
        return null;
    }
  };

  const getStatusMessage = (status: string) => {
    switch (status) {
      case 'received':
        return 'Order Received';
      case 'preparing':
        return 'Preparing Your Order';
      case 'ready':
        return 'Ready to Serve';
      case 'completed':
        return 'Order Completed';
      default:
        return '';
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Order Status
      </h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-center mb-8">
          {getStatusIcon(orderStatus)}
        </div>

        <h2 className="text-2xl font-semibold text-center mb-4">
          {getStatusMessage(orderStatus)}
        </h2>

        <div className="space-y-4">
          <div className="relative">
            <div
              className={`h-2 bg-indigo-600 rounded-full ${
                orderStatus === 'received' ? 'w-1/4' : 
                orderStatus === 'preparing' ? 'w-1/2' :
                orderStatus === 'ready' ? 'w-3/4' : 'w-full'
              }`}
            />
            <div className="h-2 bg-gray-200 rounded-full absolute inset-0 -z-10" />
          </div>

          {orderStatus === 'completed' && (
            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">How was your experience?</p>
              <div className="flex justify-center space-x-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-indigo-100 flex items-center justify-center"
                  >
                    {rating}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;