import React from "react";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { useStore } from "../store/useStore";
import { createOrder } from "../api/createOrder";

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, clearCart, setOrderStatus } = useStore();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      return;
    }

    try {
      const tableId = "T1"; // Replace this with the actual table ID, e.g., from the QR code
      const orderData = {
        tableId,
        items: cart.map((item) => ({
          menuItemId: item._id, // Assuming `id` matches the `menuItemId`
          quantity: item.quantity,
        })),
      };

      const response = await createOrder(orderData);

      if (response.success) {
        setOrderStatus("received");
        clearCart();
        navigate("/status");
      } else {
        console.error("Order creation failed:", response.error);
        alert("Failed to place the order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing the order:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
        <button
          onClick={() => navigate("/")}
          className="text-indigo-600 hover:text-indigo-800"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        {cart.map((item) => (
          <div key={item._id} className="flex items-center py-4 border-b last:border-b-0">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-20 h-20 object-cover rounded"
            />
            <div className="flex-1 ml-4">
              <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
              <p className="text-gray-600">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center">
              <select
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item.id, parseInt(e.target.value))
                }
                className="mr-4 rounded border-gray-300"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}

        <div className="mt-8 border-t pt-4">
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Tax (10%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={handlePlaceOrder}
          className="w-full mt-8 bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 font-medium"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Cart;