import { api } from "encore.dev/api";
import { Query } from "encore.dev/api";
import db from "../db";

export interface Ingredient {
  id: number;
  name: string;
  category: string;
  price: number;
  image_url: string | null;
}

export interface ListIngredientsParams {
  category?: Query<string>;
}

export interface ListIngredientsResponse {
  ingredients: Ingredient[];
}

// Retrieves all available ingredients, optionally filtered by category.
export const listIngredients = api<ListIngredientsParams, ListIngredientsResponse>(
  { expose: true, method: "GET", path: "/ingredients" },
  async (params) => {
    let query = `SELECT id, name, category, price, image_url FROM ingredients`;
    const queryParams: any[] = [];
    
    if (params.category) {
      query += ` WHERE category = $1`;
      queryParams.push(params.category);
    }
    
    query += ` ORDER BY category, name`;
    
    const ingredients = await db.rawQueryAll<Ingredient>(query, ...queryParams);
    return { ingredients };
  }
);
