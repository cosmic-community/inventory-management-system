import { createBucketClient } from '@cosmicjs/sdk'
import { Product, Category, Location, Client, User, Invoice, Quotation, CosmicResponse } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Helper function for error handling
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// ============= PRODUCTS =============

// Fetch all products with optional client filter
export async function getAllProducts(clientId?: string): Promise<Product[]> {
  try {
    const query: any = { type: 'products' }
    if (clientId) {
      query['metadata.client'] = clientId
    }
    
    const response = await cosmic.objects
      .find(query)
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail'])
      .depth(1)
    
    return response.objects as Product[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch products')
  }
}

// Fetch single product by slug
export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'products', slug })
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail'])
      .depth(1)
    
    return response.object as Product
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch product')
  }
}

// ============= CATEGORIES =============

// Fetch all categories with optional client filter
export async function getAllCategories(clientId?: string): Promise<Category[]> {
  try {
    const query: any = { type: 'categories' }
    if (clientId) {
      query['metadata.client'] = clientId
    }
    
    const response = await cosmic.objects
      .find(query)
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail'])
    
    return response.objects as Category[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch categories')
  }
}

// ============= LOCATIONS =============

// Fetch all locations with optional client filter
export async function getAllLocations(clientId?: string): Promise<Location[]> {
  try {
    const query: any = { type: 'locations' }
    if (clientId) {
      query['metadata.client'] = clientId
    }
    
    const response = await cosmic.objects
      .find(query)
      .props(['id', 'title', 'slug', 'metadata'])
    
    return response.objects as Location[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch locations')
  }
}

// ============= CLIENTS =============

// Fetch all clients
export async function getAllClients(): Promise<Client[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'clients' })
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail'])
    
    return response.objects as Client[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch clients')
  }
}

// Fetch single client by ID
export async function getClientById(id: string): Promise<Client | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'clients', id })
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail'])
    
    return response.object as Client
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch client')
  }
}

// ============= USERS =============

// Fetch user by email
export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'users',
        'metadata.email': email 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    if (response.objects.length === 0) {
      return null
    }
    
    return response.objects[0] as User
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch user')
  }
}

// Fetch all users with optional client filter
export async function getAllUsers(clientId?: string): Promise<User[]> {
  try {
    const query: any = { type: 'users' }
    if (clientId) {
      query['metadata.client'] = clientId
    }
    
    const response = await cosmic.objects
      .find(query)
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail'])
      .depth(1)
    
    return response.objects as User[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch users')
  }
}

// ============= INVOICES =============

// Fetch all invoices with optional client filter
export async function getAllInvoices(clientId?: string): Promise<Invoice[]> {
  try {
    const query: any = { type: 'invoices' }
    if (clientId) {
      query['metadata.client'] = clientId
    }
    
    const response = await cosmic.objects
      .find(query)
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail'])
      .depth(1)
    
    return response.objects as Invoice[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch invoices')
  }
}

// Fetch single invoice by slug
export async function getInvoiceBySlug(slug: string): Promise<Invoice | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'invoices', slug })
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail'])
      .depth(1)
    
    return response.object as Invoice
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch invoice')
  }
}

// ============= QUOTATIONS =============

// Fetch all quotations with optional client filter
export async function getAllQuotations(clientId?: string): Promise<Quotation[]> {
  try {
    const query: any = { type: 'quotations' }
    if (clientId) {
      query['metadata.client'] = clientId
    }
    
    const response = await cosmic.objects
      .find(query)
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail'])
      .depth(1)
    
    return response.objects as Quotation[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch quotations')
  }
}

// Fetch single quotation by slug
export async function getQuotationBySlug(slug: string): Promise<Quotation | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'quotations', slug })
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail'])
      .depth(1)
    
    return response.object as Quotation
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch quotation')
  }
}

// ============= QUERY HELPERS =============

// Fetch products by category ID
export async function getProductsByCategory(categoryId: string, clientId?: string): Promise<Product[]> {
  try {
    const query: any = { 
      type: 'products',
      'metadata.category': categoryId 
    }
    if (clientId) {
      query['metadata.client'] = clientId
    }
    
    const response = await cosmic.objects
      .find(query)
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail'])
      .depth(1)
    
    return response.objects as Product[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch products by category')
  }
}

// Fetch products by location ID
export async function getProductsByLocation(locationId: string, clientId?: string): Promise<Product[]> {
  try {
    const query: any = { 
      type: 'products',
      'metadata.location': locationId 
    }
    if (clientId) {
      query['metadata.client'] = clientId
    }
    
    const response = await cosmic.objects
      .find(query)
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail'])
      .depth(1)
    
    return response.objects as Product[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch products by location')
  }
}