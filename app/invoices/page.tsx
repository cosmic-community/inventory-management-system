'use client'

import { useEffect, useState } from 'react'
import { Invoice } from '@/types'
import { formatCurrency } from '@/lib/utils'
import { generateInvoicePDF } from '@/lib/pdf'
import Link from 'next/link'

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/invoices')
      .then(res => res.json())
      .then(data => {
        setInvoices(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handleDownloadPDF = (invoice: Invoice) => {
    generateInvoicePDF(invoice)
  }

  if (loading) {
    return (
      <div className="container py-8">
        <p>Loading invoices...</p>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Invoices
          </h1>
          <p className="text-gray-600">
            Manage and track all invoices
          </p>
        </div>
        <button className="btn-primary">
          + Create Invoice
        </button>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
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
              {invoices.map(invoice => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {invoice.metadata.invoice_number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {invoice.metadata.customer_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(invoice.metadata.invoice_date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(invoice.metadata.due_date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatCurrency(invoice.metadata.total)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`badge ${
                      invoice.metadata.status.key === 'paid'
                        ? 'bg-green-100 text-green-800'
                        : invoice.metadata.status.key === 'overdue'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {invoice.metadata.status.value}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex gap-2">
                      <Link
                        href={`/invoices/${invoice.slug}`}
                        className="text-primary hover:text-blue-700"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => handleDownloadPDF(invoice)}
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

      {invoices.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No invoices found</p>
        </div>
      )}
    </div>
  )
}