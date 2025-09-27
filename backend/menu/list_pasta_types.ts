import { api } from "encore.dev/api";
import db from "../db";

export interface PastaType {
  id: number;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
}

export interface ListPastaTypesResponse {
  pasta_types: PastaType[];
}

// Retrieves all available pasta types.
export const listPastaTypes = api<void, ListPastaTypesResponse>(
  { expose: true, method: "GET", path: "/pasta-types" },
  async () => {
    const pasta_types = await db.queryAll<PastaType>`
      SELECT id, name, description, price, image_url 
      FROM pasta_types 
      ORDER BY name
    `;
    return { pasta_types };
  }
);
