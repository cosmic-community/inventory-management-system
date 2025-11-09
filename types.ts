// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
  status?: string;
  thumbnail?: string;
}

// Category interface
export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name: string;
    description?: string;
  };
}

// Location interface
export interface Location extends CosmicObject {
  type: 'locations';
  metadata: {
    name: string;
    address?: string;
    type?: {
      key: string;
      value: string;
    };
  };
}

// Product interface
export interface Product extends CosmicObject {
  type: 'products';
  metadata: {
    name: string;
    sku: string;
    description?: string;
    category?: Category;
    quantity: number;
    low_stock_alert?: number;
    price: number;
    location?: Location;
    image?: {
      url: string;
      imgix_url: string;
    };
    status: {
      key: string;
      value: string;
    };
  };
}

// Type guards
export function isProduct(obj: CosmicObject): obj is Product {
  return obj.type === 'products';
}

export function isCategory(obj: CosmicObject): obj is Category {
  return obj.type === 'categories';
}

export function isLocation(obj: CosmicObject): obj is Location {
  return obj.type === 'locations';
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Product status type
export type ProductStatus = 'active' | 'discontinued' | 'out_of_stock';

// Location type
export type LocationType = 'warehouse' | 'store' | 'distribution';

// Dashboard stats interface
export interface DashboardStats {
  totalProducts: number;
  activeProducts: number;
  lowStockProducts: number;
  totalValue: number;
  categories: number;
  locations: number;
}