// Simple API client for Express.js backend
const API_BASE_URL = 'http://localhost:4000';

export interface PastaType {
  id: number;
  name: string;
  description: string;
  price: number;
}

export interface Sauce {
  id: number;
  name: string;
  description: string;
  price: number;
}

export interface Ingredient {
  id: number;
  name: string;
  category: string;
  price: number;
  popular?: boolean;
}

export interface OrderItem {
  pasta_type_id: number;
  sauce_id: number;
  ingredient_ids: number[];
  quantity: number;
}

export interface Order {
  id: number;
  customer_name: string;
  customer_email?: string;
  customer_phone: string;
  delivery_address?: string;
  delivery_notes?: string;
  estimated_time?: string;
  items: OrderItem[];
  status: string;
  created_at: string;
  total: number;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Pasta Types API
  async getPastaTypes(): Promise<PastaType[]> {
    return this.request<PastaType[]>('/pasta-types');
  }

  // Sauces API
  async getSauces(): Promise<Sauce[]> {
    return this.request<Sauce[]>('/sauces');
  }

  // Ingredients API
  async getIngredients(category?: string): Promise<Ingredient[]> {
    const params = category ? `?category=${encodeURIComponent(category)}` : '';
    return this.request<Ingredient[]>(`/ingredients${params}`);
  }

  // Orders API
  async createOrder(orderData: {
    customer_name: string;
    customer_email?: string;
    customer_phone: string;
    delivery_address?: string;
    delivery_notes?: string;
    estimated_time?: string;
    items: OrderItem[];
  }): Promise<Order> {
    return this.request<Order>('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async getOrder(id: number): Promise<Order> {
    return this.request<Order>(`/orders/${id}`);
  }
}

// Export a default client instance
export default new ApiClient();
