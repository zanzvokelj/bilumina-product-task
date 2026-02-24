import type { ApiResponse, Item } from "../types/api";

export interface UiProduct {
  id: number;
  name: string;
  price: number;
  stock: number;
  imageUrl: string | null;
}

const TARGET_GROUP_ID = 30284; // Košare

export function transformItems(data: ApiResponse): {
  groupName: string;
  products: UiProduct[];
} {
  const groups = data.rootGroup?.groups;
  if (!groups?.length) {
    return { groupName: "", products: [] };
  }

  const selectedGroup = groups.find((g) => g.id === TARGET_GROUP_ID);
  if (!selectedGroup?.items) {
    return { groupName: "", products: [] };
  }

  const itemsArray: Item[] = Object.values(selectedGroup.items);

  const products = itemsArray.map((item) => {
    const firstImage = item.gallery?.[0]?.imageUrl;

    const imageUrl = firstImage
      ? `${data.cdnUrl.itemSmall}${firstImage}`
      : null;

    return {
      id: item.id,
      name: item.name,
      price: item.price,
      stock: item.stock,
      imageUrl,
    };
  });

  return {
    groupName: selectedGroup.nameSmall,
    products,
  };
}