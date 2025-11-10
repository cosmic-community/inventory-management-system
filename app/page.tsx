import { getAllProducts, getAllCategories, getAllLocations, getAllClients, getAllInvoices, getAllQuotations } from '@/lib/cosmic'
import { calculateTotalValue, getActiveProductsCount, getLowStockProducts } from '@/lib/utils'
import DashboardStats from '@/components/DashboardStats'
import ProductGrid from '@/components/ProductGrid'
import QuickFilters from '@/components/QuickFilters'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export default async function HomePage() {
  try {
    const session = await getServerSession(authOptions)
    
    // Get client-specific data if user is not superadmin
    const clientId = session?.user?.role !== 'superadmin' ? session?.user?.clientId : undefined
    
    const [products, categories, locations, clients, invoices, quotations] = await Promise.all([
      getAllProducts(clientId),
      getAllCategories(clientId),
      getAllLocations(clientId),
      getAllClients(),
      getAllInvoices(clientId),
      getAllQuotations(clientId),
    ])
    
    const stats = {
      totalProducts: products.length,
      activeProducts: getActiveProductsCount(products),
      lowStockProducts: getLowStockProducts(products).length,
      totalValue: calculateTotalValue(products),
      categories: categories.length,
      locations: locations.length,
      clients: clients.length,
      activeInvoices: invoices.filter(inv => inv.metadata.status.key !== 'paid' && inv.metadata.status.key !== 'cancelled').length,
      pendingQuotations: quotations.filter(q => q.metadata.status.key === 'sent').length,
    }
    
    return (
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Finovate360 Dashboard
          </h1>
          <p className="text-gray-600">
            Complete business management platform with RBAC and client isolation
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
  } catch (error) {
    console.error('Error loading dashboard:', error)
    return (
      <div className="container py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Error Loading Dashboard</h2>
          <p>There was an error loading the dashboard. Please check your environment configuration.</p>
          <p className="text-sm mt-2">Make sure NEXTAUTH_SECRET and NEXTAUTH_URL are set in your environment variables.</p>
        </div>
      </div>
    )
  }
}