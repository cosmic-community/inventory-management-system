'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'

export default function Header() {
  const { data: session } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📊</span>
            <span className="font-bold text-xl text-gray-900">
              Finovate360
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              href="/" 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Dashboard
            </Link>
            {session && (
              <>
                <Link 
                  href="/clients" 
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                >
                  Clients
                </Link>
                <Link 
                  href="/users" 
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                >
                  Users
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
                <Link 
                  href="/invoices" 
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                >
                  Invoices
                </Link>
                <Link 
                  href="/quotations" 
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                >
                  Quotations
                </Link>
              </>
            )}
          </nav>
          
          <div className="flex items-center gap-3">
            {session ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600 hidden md:block">
                  {session.user?.name}
                </span>
                <button
                  onClick={() => signOut()}
                  className="btn-secondary text-sm"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link href="/auth/signin" className="btn-primary text-sm">
                Sign In
              </Link>
            )}
            <button 
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 py-4">
          <nav className="container flex flex-col gap-3">
            <Link href="/" className="text-gray-600 hover:text-gray-900 font-medium">
              Dashboard
            </Link>
            {session && (
              <>
                <Link href="/clients" className="text-gray-600 hover:text-gray-900 font-medium">
                  Clients
                </Link>
                <Link href="/users" className="text-gray-600 hover:text-gray-900 font-medium">
                  Users
                </Link>
                <Link href="/categories" className="text-gray-600 hover:text-gray-900 font-medium">
                  Categories
                </Link>
                <Link href="/locations" className="text-gray-600 hover:text-gray-900 font-medium">
                  Locations
                </Link>
                <Link href="/invoices" className="text-gray-600 hover:text-gray-900 font-medium">
                  Invoices
                </Link>
                <Link href="/quotations" className="text-gray-600 hover:text-gray-900 font-medium">
                  Quotations
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}