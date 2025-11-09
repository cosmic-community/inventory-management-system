import { Product } from '@/types'

// Format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

// Check if product is low stock
export function isLowStock(product: Product): boolean {
  const alertLevel = product.metadata.low_stock_alert || 0
  return product.metadata.quantity <= alertLevel && product.metadata.quantity > 0
}

// Check if product is out of stock
export function isOutOfStock(product: Product): boolean {
  return product.metadata.quantity === 0
}

// Get stock status badge color
export function getStockStatusColor(product: Product): string {
  if (isOutOfStock(product)) return 'bg-danger text-danger-foreground'
  if (isLowStock(product)) return 'bg-warning text-warning-foreground'
  return 'bg-success text-success-foreground'
}

// Get stock status text
export function getStockStatusText(product: Product): string {
  if (isOutOfStock(product)) return 'Out of Stock'
  if (isLowStock(product)) return 'Low Stock'
  return 'In Stock'
}

// Calculate total inventory value
export function calculateTotalValue(products: Product[]): number {
  return products.reduce((total, product) => {
    return total + (product.metadata.price * product.metadata.quantity)
  }, 0)
}

// Get active products count
export function getActiveProductsCount(products: Product[]): number {
  return products.filter(p => p.metadata.status.key === 'active').length
}

// Get low stock products
export function getLowStockProducts(products: Product[]): Product[] {
  return products.filter(isLowStock)
}