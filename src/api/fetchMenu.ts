import axios from "axios";

interface MenuItem {
  _id: string; // MongoDB ObjectId for the menu item
  name: string;
  description: string;
  price: number;
  image: string;
}

interface FetchMenuResponse {
  success: boolean;
  data?: MenuItem[];
  error?: string;
}

const API_BASE_URL = "http://localhost:8000/api/menu-items"; // Replace with your actual backend URL

export async function fetchMenu(): Promise<FetchMenuResponse> {
  try {
    const response = await axios.get(API_BASE_URL);
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