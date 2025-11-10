'use client'

import { useEffect, useState } from 'react'
import { Quotation } from '@/types'
import { formatCurrency } from '@/lib/utils'
import { generateQuotationPDF } from '@/lib/pdf'
import Link from 'next/link'

export default function QuotationsPage() {
  const [quotations, setQuotations] = useState<Quotation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/quotations')
      .then(res => res.json())
      .then(data => {
        setQuotations(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handleDownloadPDF = (quotation: Quotation) => {
    generateQuotationPDF(quotation)
  }

  if (loading) {
    return (
      <div className="container py-8">
        <p>Loading quotations...</p>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Quotations
          </h1>
          <p className="text-gray-600">
            Manage and track all quotations
          </p>
        </div>
        <button className="btn-primary">
          + Create Quotation
        </button>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quote #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valid Until
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {quotations.map(quotation => (
                <tr key={quotation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {quotation.metadata.quote_number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {quotation.metadata.customer_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(quotation.metadata.quote_date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(quotation.metadata.valid_until).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatCurrency(quotation.metadata.total)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`badge ${
                      quotation.metadata.status.key === 'accepted'
                        ? 'bg-green-100 text-green-800'
                        : quotation.metadata.status.key === 'rejected' || quotation.metadata.status.key === 'expired'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {quotation.metadata.status.value}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex gap-2">
                      <Link
                        href={`/quotations/${quotation.slug}`}
                        className="text-primary hover:text-blue-700"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => handleDownloadPDF(quotation)}
                        className="text-primary hover:text-blue-700"
                      >
                        PDF
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {quotations.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No quotations found</p>
        </div>
      )}
    </div>
  )
}