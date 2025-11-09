import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📦</span>
            <span className="font-bold text-xl text-gray-900">
              Inventory System
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              href="/" 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Dashboard
            </Link>
            <Link 
              href="/categories" 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Categories
            </Link>
            <Link 
              href="/locations" 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Locations
            </Link>
          </nav>
          
          <div className="flex items-center gap-3">
            <button className="md:hidden p-2 text-gray-600 hover:text-gray-900">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}