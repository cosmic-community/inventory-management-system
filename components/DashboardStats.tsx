import { formatCurrency } from '@/lib/utils'
import { DashboardStats as Stats } from '@/types'

export default function DashboardStats({ stats }: { stats: Stats }) {
  const statItems = [
    {
      label: 'Total Products',
      value: stats.totalProducts,
      icon: '📦',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      label: 'Active Products',
      value: stats.activeProducts,
      icon: '✅',
      color: 'bg-green-50 text-green-600',
    },
    {
      label: 'Low Stock Items',
      value: stats.lowStockProducts,
      icon: '⚠️',
      color: 'bg-yellow-50 text-yellow-600',
    },
    {
      label: 'Inventory Value',
      value: formatCurrency(stats.totalValue),
      icon: '💰',
      color: 'bg-purple-50 text-purple-600',
    },
    {
      label: 'Total Clients',
      value: stats.clients,
      icon: '🏢',
      color: 'bg-indigo-50 text-indigo-600',
    },
    {
      label: 'Active Invoices',
      value: stats.activeInvoices,
      icon: '🧾',
      color: 'bg-pink-50 text-pink-600',
    },
    {
      label: 'Pending Quotes',
      value: stats.pendingQuotations,
      icon: '📋',
      color: 'bg-orange-50 text-orange-600',
    },
    {
      label: 'Locations',
      value: stats.locations,
      icon: '📍',
      color: 'bg-teal-50 text-teal-600',
    },
  ]
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {statItems.map((item) => (
        <div key={item.label} className="stat-card">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-3xl p-2 rounded-lg ${item.color}`}>
              {item.icon}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-1">{item.label}</p>
          <p className="text-2xl font-bold text-gray-900">{item.value}</p>
        </div>
      ))}
    </div>
  )
}