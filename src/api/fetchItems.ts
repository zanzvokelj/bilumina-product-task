import type { ApiResponse } from "../types/api";

const API_URL =
  "https://egi.bilumina.com/mw/api/v1/items/get?key=bf84d5ef-7fe2-4609-8b75-49279dd3271e";

export async function fetchItems(): Promise<ApiResponse> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch items");
  }

  const data: ApiResponse = await response.json();
  return data;
}