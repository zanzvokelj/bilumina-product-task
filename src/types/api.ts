// Root API response
export interface ApiResponse {
  success: boolean;
  cdnUrl: {
    grid: string;
    itemSmall: string;
    itemBig: string;
  };
  rootGroup: RootGroup;
}

// Root group
export interface RootGroup {
  id: number;
  code: string;
  name: string;
  groups: Group[];
}

// Group
export interface Group {
  id: number;
  nameSmall: string;
  parentId: number;
  url: string;
  order: number;

  // Items 
  items?: Record<string, Item>;

  attributes: {
    brand: Record<string, string>;
    color: Record<string, string>;
    action: unknown[];
    discount: unknown[];
    priceMin: string;
    priceMax: string;
  };
}

// Single product item
export interface Item {
  id: number;
  sku: string;
  parentId: number | null;
  groupId: number;
  groupName: string;

  name: string;
  description: string;

  brand: string;
  colorId: number | null;
  color: string;

  price: number;
  priceOld: number;
  discountPercent: number;

  stock: number;

  gallery: {
    imageUrl: string;
  }[];

  sort: string;
}