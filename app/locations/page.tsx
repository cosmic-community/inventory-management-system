import { getAllLocations, getAllProducts } from '@/lib/cosmic'
import LocationCard from '@/components/LocationCard'

export default async function LocationsPage() {
  const [locations, products] = await Promise.all([
    getAllLocations(),
    getAllProducts(),
  ])
  
  // Count products per location
  const locationsWithCounts = locations.map(location => {
    const productCount = products.filter(
      p => p.metadata.location?.id === location.id
    ).length
    return { ...location, productCount }
  })
  
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Storage Locations
        </h1>
        <p className="text-gray-600">
          View inventory across all locations
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {locationsWithCounts.map(location => (
          <LocationCard 
            key={location.id} 
            location={location}
            productCount={location.productCount}
          />
        ))}
      </div>
      
      {locations.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No locations found</p>
        </div>
      )}
    </div>
  )
}