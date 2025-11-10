import { getAllProducts, getAllCategories, getAllLocations, getAllClients, getAllInvoices, getAllQuotations } from '@/lib/cosmic'
import { calculateTotalValue, getActiveProductsCount, getLowStockProducts } from '@/lib/utils'
import DashboardStats from '@/components/DashboardStats'
import ProductGrid from '@/components/ProductGrid'
import QuickFilters from '@/components/QuickFilters'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export default async function HomePage() {
  try {
    // Validate environment variables before proceeding
    if (!process.env.COSMIC_BUCKET_SLUG || !process.env.COSMIC_READ_KEY) {
      throw new Error('Missing Cosmic CMS configuration')
    }

    if (!process.env.NEXTAUTH_SECRET || !process.env.NEXTAUTH_URL) {
      throw new Error('Missing NextAuth configuration')
    }

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
    
    // Provide more specific error messages
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    
    return (
      <div className="container py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Error Loading Dashboard</h2>
          <p className="mb-4">There was an error loading the dashboard. Please check your environment configuration.</p>
          
          <div className="bg-white border border-red-300 rounded p-4 mt-4">
            <h3 className="font-semibold mb-2">Required Environment Variables:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>COSMIC_BUCKET_SLUG</li>
              <li>COSMIC_READ_KEY</li>
              <li>COSMIC_WRITE_KEY</li>
              <li>NEXTAUTH_SECRET (generate with: openssl rand -base64 32)</li>
              <li>NEXTAUTH_URL (e.g., http://localhost:3000)</li>
            </ul>
          </div>
          
          <div className="mt-4 text-sm">
            <p className="font-semibold">Error Details:</p>
            <p className="mt-1 font-mono bg-red-100 p-2 rounded">{errorMessage}</p>
          </div>
          
          <div className="mt-4 text-sm">
            <p>Copy <code className="bg-red-100 px-2 py-1 rounded">.env.example</code> to <code className="bg-red-100 px-2 py-1 rounded">.env.local</code> and fill in your values.</p>
          </div>
        </div>
      </div>
    )
  }
}