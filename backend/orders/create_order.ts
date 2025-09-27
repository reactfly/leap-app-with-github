import { api } from "encore.dev/api";
import db from "../db";

export interface OrderItemRequest {
  pasta_type_id: number;
  sauce_id: number;
  ingredient_ids: number[];
  quantity: number;
}

export interface CreateOrderRequest {
  customer_name: string;
  customer_email?: string;
  customer_phone?: string;
  items: OrderItemRequest[];
}

export interface Order {
  id: number;
  customer_name: string;
  customer_email: string | null;
  customer_phone: string | null;
  status: string;
  total_price: number;
  created_at: Date;
}

// Creates a new order with pasta items and ingredients.
export const createOrder = api(
  { expose: true, method: "POST", path: "/orders" },
  async (req: CreateOrderRequest): Promise<Order> => {
    const tx = await db.begin();
    try {
      // Calculate total price
      let totalPrice = 0;
      
      for (const item of req.items) {
        // Get pasta type price
        const pastaType = await tx.queryRow<{ price: number }>`
          SELECT price FROM pasta_types WHERE id = ${item.pasta_type_id}
        `;
        if (!pastaType) {
          throw new Error(`Pasta type ${item.pasta_type_id} not found`);
        }
        
        // Get sauce price
        const sauce = await tx.queryRow<{ price: number }>`
          SELECT price FROM sauces WHERE id = ${item.sauce_id}
        `;
        if (!sauce) {
          throw new Error(`Sauce ${item.sauce_id} not found`);
        }
        
        // Get ingredients prices
        let ingredientsPrice = 0;
        if (item.ingredient_ids.length > 0) {
          const ingredients = await tx.queryAll<{ price: number }>`
            SELECT price FROM ingredients WHERE id = ANY(${item.ingredient_ids})
          `;
          ingredientsPrice = ingredients.reduce((sum: number, ing: { price: number }) => sum + ing.price, 0);
        }
        
        const itemPrice = (pastaType.price + sauce.price + ingredientsPrice) * item.quantity;
        totalPrice += itemPrice;
      }
      
      // Create order
      const order = await tx.queryRow<Order>`
        INSERT INTO orders (customer_name, customer_email, customer_phone, total_price)
        VALUES (${req.customer_name}, ${req.customer_email || null}, ${req.customer_phone || null}, ${totalPrice})
        RETURNING id, customer_name, customer_email, customer_phone, status, total_price, created_at
      `;
      
      if (!order) {
        throw new Error("Failed to create order");
      }
      
      // Create order items
      for (const item of req.items) {
        const pastaType = await tx.queryRow<{ price: number }>`
          SELECT price FROM pasta_types WHERE id = ${item.pasta_type_id}
        `;
        const sauce = await tx.queryRow<{ price: number }>`
          SELECT price FROM sauces WHERE id = ${item.sauce_id}
        `;
        
        let ingredientsPrice = 0;
        if (item.ingredient_ids.length > 0) {
          const ingredients = await tx.queryAll<{ price: number }>`
            SELECT price FROM ingredients WHERE id = ANY(${item.ingredient_ids})
          `;
          ingredientsPrice = ingredients.reduce((sum: number, ing: { price: number }) => sum + ing.price, 0);
        }
        
        const itemPrice = (pastaType!.price + sauce!.price + ingredientsPrice) * item.quantity;
        
        const orderItem = await tx.queryRow<{ id: number }>`
          INSERT INTO order_items (order_id, pasta_type_id, sauce_id, quantity, item_price)
          VALUES (${order.id}, ${item.pasta_type_id}, ${item.sauce_id}, ${item.quantity}, ${itemPrice})
          RETURNING id
        `;
        
        if (!orderItem) {
          throw new Error("Failed to create order item");
        }
        
        // Add ingredients to order item
        for (const ingredientId of item.ingredient_ids) {
          await tx.exec`
            INSERT INTO order_item_ingredients (order_item_id, ingredient_id)
            VALUES (${orderItem.id}, ${ingredientId})
          `;
        }
      }
      
      await tx.commit();
      return order;
    } catch (error) {
      await tx.rollback();
      throw error;
    }
  }
);
