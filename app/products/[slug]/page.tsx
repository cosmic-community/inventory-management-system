// app/products/[slug]/page.tsx
import { getProductBySlug, getAllProducts } from '@/lib/cosmic'
import { formatCurrency, getStockStatusColor, getStockStatusText } from '@/lib/utils'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export async function generateStaticParams() {
  const products = await getAllProducts()
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export default async function ProductPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  
  if (!product) {
    notFound()
  }
  
  const stockStatusColor = getStockStatusColor(product)
  const stockStatusText = getStockStatusText(product)
  
  return (
    <div className="container py-8">
      <Link 
        href="/"
        className="inline-flex items-center text-primary hover:text-blue-700 mb-6"
      >
        ← Back to Products
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {product.metadata.image ? (
            <img
              src={`${product.metadata.image.imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
              alt={product.title}
              className="w-full h-auto rounded-lg"
            />
          ) : (
            <div className="w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-400 text-4xl">📦</span>
            </div>
          )}
        </div>
        
        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.metadata.name}
            </h1>
            <p className="text-gray-600">SKU: {product.metadata.sku}</p>
          </div>
          
          <div className="flex items-center gap-3">
            <span className={`badge ${stockStatusColor}`}>
              {stockStatusText}
            </span>
            <span className="badge bg-gray-100 text-gray-800">
              {product.metadata.status.value}
            </span>
          </div>
          
          <div className="card">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Price</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(product.metadata.price)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Quantity</p>
                <p className="text-2xl font-bold text-gray-900">
                  {product.metadata.quantity}
                </p>
              </div>
            </div>
          </div>
          
          {product.metadata.description && (
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 whitespace-pre-line">
                {product.metadata.description}
              </p>
            </div>
          )}
          
          {product.metadata.category && (
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-2">Category</h3>
              <div className="flex items-center gap-3">
                {product.metadata.category.thumbnail && (
                  <img
                    src={`${product.metadata.category.thumbnail}?w=48&h=48&fit=crop&auto=format,compress`}
                    alt={product.metadata.category.metadata.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                )}
                <div>
                  <p className="font-medium text-gray-900">
                    {product.metadata.category.metadata.name}
                  </p>
                  {product.metadata.category.metadata.description && (
                    <p className="text-sm text-gray-600">
                      {product.metadata.category.metadata.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {product.metadata.location && (
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-2">Location</h3>
              <div>
                <p className="font-medium text-gray-900">
                  {product.metadata.location.metadata.name}
                </p>
                {product.metadata.location.metadata.type && (
                  <p className="text-sm text-gray-600">
                    {product.metadata.location.metadata.type.value}
                  </p>
                )}
                {product.metadata.location.metadata.address && (
                  <p className="text-sm text-gray-600 mt-2 whitespace-pre-line">
                    {product.metadata.location.metadata.address}
                  </p>
                )}
              </div>
            </div>
          )}
          
          {product.metadata.low_stock_alert && (
            <div className="card bg-yellow-50 border-yellow-200">
              <div className="flex items-start gap-3">
                <span className="text-2xl">⚠️</span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Low Stock Alert
                  </h3>
                  <p className="text-sm text-gray-600">
                    This product is set to alert when stock falls below {product.metadata.low_stock_alert} units.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}