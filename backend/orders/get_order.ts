import { api, APIError } from "encore.dev/api";
import db from "../db";

export interface OrderItem {
  id: number;
  pasta_type_name: string;
  sauce_name: string;
  ingredients: string[];
  quantity: number;
  item_price: number;
}

export interface OrderDetails {
  id: number;
  customer_name: string;
  customer_email: string | null;
  customer_phone: string | null;
  status: string;
  total_price: number;
  created_at: Date;
  items: OrderItem[];
}

// Retrieves a specific order with all its items and ingredients.
export const getOrder = api<{ id: number }, OrderDetails>(
  { expose: true, method: "GET", path: "/orders/:id" },
  async (params) => {
    const order = await db.queryRow<Omit<OrderDetails, 'items'>>`
      SELECT id, customer_name, customer_email, customer_phone, status, total_price, created_at
      FROM orders 
      WHERE id = ${params.id}
    `;
    
    if (!order) {
      throw APIError.notFound("Order not found");
    }
    
    // Get order items with pasta type and sauce names
    const items = await db.queryAll<Omit<OrderItem, 'ingredients'>>`
      SELECT 
        oi.id,
        pt.name as pasta_type_name,
        s.name as sauce_name,
        oi.quantity,
        oi.item_price
      FROM order_items oi
      JOIN pasta_types pt ON oi.pasta_type_id = pt.id
      JOIN sauces s ON oi.sauce_id = s.id
      WHERE oi.order_id = ${params.id}
      ORDER BY oi.id
    `;
    
    // Get ingredients for each order item
    const itemsWithIngredients: OrderItem[] = [];
    for (const item of items) {
      const ingredients = await db.queryAll<{ name: string }>`
        SELECT i.name
        FROM order_item_ingredients oii
        JOIN ingredients i ON oii.ingredient_id = i.id
        WHERE oii.order_item_id = ${item.id}
        ORDER BY i.name
      `;
      
      itemsWithIngredients.push({
        ...item,
        ingredients: ingredients.map(ing => ing.name)
      });
    }
    
    return {
      ...order,
      items: itemsWithIngredients
    };
  }
);
