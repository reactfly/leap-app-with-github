import { api } from "encore.dev/api";
import db from "../db";

export interface Sauce {
  id: number;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
}

export interface ListSaucesResponse {
  sauces: Sauce[];
}

// Retrieves all available sauces.
export const listSauces = api<void, ListSaucesResponse>(
  { expose: true, method: "GET", path: "/sauces" },
  async () => {
    const sauces = await db.queryAll<Sauce>`
      SELECT id, name, description, price, image_url 
      FROM sauces 
      ORDER BY name
    `;
    return { sauces };
  }
);
