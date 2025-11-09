import { getAllProducts, getAllCategories, getAllLocations } from '@/lib/cosmic'
import { calculateTotalValue, getActiveProductsCount, getLowStockProducts } from '@/lib/utils'
import DashboardStats from '@/components/DashboardStats'
import ProductGrid from '@/components/ProductGrid'
import QuickFilters from '@/components/QuickFilters'

export default async function HomePage() {
  const [products, categories, locations] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
    getAllLocations(),
  ])
  
  const stats = {
    totalProducts: products.length,
    activeProducts: getActiveProductsCount(products),
    lowStockProducts: getLowStockProducts(products).length,
    totalValue: calculateTotalValue(products),
    categories: categories.length,
    locations: locations.length,
  }
  
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Inventory Dashboard
        </h1>
        <p className="text-gray-600">
          Track and manage your inventory across all locations
        </p>
      </div>
      
      <DashboardStats stats={stats} />
      
      <div className="mt-8">
        <QuickFilters 
          categories={categories}
          locations={locations}
        />
      </div>
      
      <div className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            All Products
          </h2>
          <span className="text-sm text-gray-600">
            {products.length} items
          </span>
        </div>
        <ProductGrid products={products} />
      </div>
    </div>
  )
}