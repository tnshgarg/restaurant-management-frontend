import axios from "axios";

interface OrderItem {
  menuItemId: string;
  quantity: number;
}

interface CreateOrderRequest {
  tableId: string;
  items: OrderItem[];
}

interface CreateOrderResponse {
  success: boolean;
  data?: any;
  error?: string;
}

const API_BASE_URL = `${process.env.REACT_APP_API_URL}/api/orders`; // Replace with your backend URL

export async function createOrder(orderData: CreateOrderRequest): Promise<CreateOrderResponse> {
  try {
    const response = await axios.post(API_BASE_URL, orderData);
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.error || error.message,
    };
  }
}