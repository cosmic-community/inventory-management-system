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
    client?: Client;
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
    client?: Client;
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
    client?: Client;
  };
}

// Client interface
export interface Client extends CosmicObject {
  type: 'clients';
  metadata: {
    client_name: string;
    contact_email: string;
    contact_phone?: string;
    address?: string;
    logo?: {
      url: string;
      imgix_url: string;
    };
    active_modules: string[];
    status: {
      key: string;
      value: string;
    };
  };
}

// User interface
export interface User extends CosmicObject {
  type: 'users';
  metadata: {
    email: string;
    password_hash: string;
    full_name: string;
    role: {
      key: string;
      value: string;
    };
    client?: Client;
    active: boolean;
    phone?: string;
    avatar?: {
      url: string;
      imgix_url: string;
    };
  };
}

// Invoice interface
export interface Invoice extends CosmicObject {
  type: 'invoices';
  metadata: {
    invoice_number: string;
    client?: Client;
    customer_name: string;
    customer_email?: string;
    invoice_date: string;
    due_date: string;
    items: InvoiceItem[];
    subtotal: number;
    tax?: number;
    total: number;
    status: {
      key: string;
      value: string;
    };
    notes?: string;
  };
}

// Quotation interface
export interface Quotation extends CosmicObject {
  type: 'quotations';
  metadata: {
    quote_number: string;
    client?: Client;
    customer_name: string;
    customer_email?: string;
    quote_date: string;
    valid_until: string;
    items: InvoiceItem[];
    subtotal: number;
    tax?: number;
    total: number;
    status: {
      key: string;
      value: string;
    };
    notes?: string;
  };
}

// Invoice/Quotation item interface
export interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
  total: number;
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

export function isClient(obj: CosmicObject): obj is Client {
  return obj.type === 'clients';
}

export function isUser(obj: CosmicObject): obj is User {
  return obj.type === 'users';
}

export function isInvoice(obj: CosmicObject): obj is Invoice {
  return obj.type === 'invoices';
}

export function isQuotation(obj: CosmicObject): obj is Quotation {
  return obj.type === 'quotations';
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// User roles
export type UserRole = 'superadmin' | 'admin' | 'user';

// Dashboard stats interface
export interface DashboardStats {
  totalProducts: number;
  activeProducts: number;
  lowStockProducts: number;
  totalValue: number;
  categories: number;
  locations: number;
  clients: number;
  activeInvoices: number;
  pendingQuotations: number;
}

// Permission interface
export interface Permission {
  module: string;
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
}

// Session user interface
export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  clientId?: string;
  permissions: Permission[];
}