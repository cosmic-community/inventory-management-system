import { Category } from '@/types'

interface CategoryCardProps {
  category: Category
  productCount: number
}

export default function CategoryCard({ category, productCount }: CategoryCardProps) {
  return (
    <div className="card hover:shadow-md transition-all">
      {category.thumbnail && (
        <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
          <img
            src={`${category.thumbnail}?w=600&h=400&fit=crop&auto=format,compress`}
            alt={category.metadata.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {category.metadata.name}
      </h3>
      
      {category.metadata.description && (
        <p className="text-gray-600 text-sm mb-4">
          {category.metadata.description}
        </p>
      )}
      
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <span className="text-sm text-gray-600">
          {productCount} {productCount === 1 ? 'product' : 'products'}
        </span>
        <button className="text-primary hover:text-blue-700 text-sm font-medium">
          View Products →
        </button>
      </div>
    </div>
  )
}