import { Location } from '@/types'

interface LocationCardProps {
  location: Location
  productCount: number
}

export default function LocationCard({ location, productCount }: LocationCardProps) {
  return (
    <div className="card hover:shadow-md transition-all">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-blue-50 rounded-lg">
          <span className="text-2xl">📍</span>
        </div>
        
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-1">
            {location.metadata.name}
          </h3>
          
          {location.metadata.type && (
            <span className="badge bg-gray-100 text-gray-800 text-xs mb-3">
              {location.metadata.type.value}
            </span>
          )}
          
          {location.metadata.address && (
            <p className="text-gray-600 text-sm whitespace-pre-line mb-4">
              {location.metadata.address}
            </p>
          )}
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <span className="text-sm text-gray-600">
              {productCount} {productCount === 1 ? 'product' : 'products'}
            </span>
            <button className="text-primary hover:text-blue-700 text-sm font-medium">
              View Inventory →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}