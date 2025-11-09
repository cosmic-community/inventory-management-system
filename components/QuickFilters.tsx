'use client'

import { useState } from 'react'
import { Category, Location } from '@/types'

interface QuickFiltersProps {
  categories: Category[]
  locations: Location[]
}

export default function QuickFilters({ categories, locations }: QuickFiltersProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedLocation, setSelectedLocation] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState<string>('')
  
  return (
    <div className="card">
      <h3 className="font-semibold text-gray-900 mb-4">Quick Filters</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search
          </label>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.metadata.name}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">All Locations</option>
            {locations.map(location => (
              <option key={location.id} value={location.id}>
                {location.metadata.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="mt-4 flex items-center gap-2">
        <button className="btn-secondary text-sm">
          Apply Filters
        </button>
        <button 
          onClick={() => {
            setSelectedCategory('')
            setSelectedLocation('')
            setSearchQuery('')
          }}
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          Clear All
        </button>
      </div>
    </div>
  )
}