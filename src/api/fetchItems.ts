import type { ApiResponse } from "../types/api";

const API_KEY = import.meta.env.BILUMINA_API_KEY;

const API_URL = `https://egi.bilumina.com/mw/api/v1/items/get?key=${API_KEY}`;

export async function fetchItems(): Promise<ApiResponse> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch items");
  }

  const data: ApiResponse = await response.json();
  return data;
}