import Link from 'next/link'
import { Product } from '@/types'
import { formatCurrency, getStockStatusColor, getStockStatusText } from '@/lib/utils'

export default function ProductCard({ product }: { product: Product }) {
  const stockStatusColor = getStockStatusColor(product)
  const stockStatusText = getStockStatusText(product)
  
  return (
    <Link href={`/products/${product.slug}`}>
      <div className="card hover:shadow-md transition-all cursor-pointer group">
        <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden">
          {product.metadata.image ? (
            <img
              src={`${product.metadata.image.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
              alt={product.metadata.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-gray-400 text-4xl">📦</span>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
            {product.metadata.name}
          </h3>
          
          <p className="text-sm text-gray-600">
            SKU: {product.metadata.sku}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-gray-900">
              {formatCurrency(product.metadata.price)}
            </span>
            <span className={`badge ${stockStatusColor} text-xs`}>
              {stockStatusText}
            </span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              Qty: {product.metadata.quantity}
            </span>
            {product.metadata.category && (
              <span className="badge bg-gray-100 text-gray-800 text-xs">
                {product.metadata.category.metadata.name}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}