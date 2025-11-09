import { getAllCategories, getAllProducts } from '@/lib/cosmic'
import CategoryCard from '@/components/CategoryCard'

export default async function CategoriesPage() {
  const [categories, products] = await Promise.all([
    getAllCategories(),
    getAllProducts(),
  ])
  
  // Count products per category
  const categoriesWithCounts = categories.map(category => {
    const productCount = products.filter(
      p => p.metadata.category?.id === category.id
    ).length
    return { ...category, productCount }
  })
  
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Product Categories
        </h1>
        <p className="text-gray-600">
          Browse products by category
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoriesWithCounts.map(category => (
          <CategoryCard 
            key={category.id} 
            category={category}
            productCount={category.productCount}
          />
        ))}
      </div>
      
      {categories.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No categories found</p>
        </div>
      )}
    </div>
  )
}