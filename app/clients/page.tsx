import { getAllClients } from '@/lib/cosmic'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function ClientsPage() {
  const session = await getServerSession(authOptions)
  
  // Only superadmins can view clients
  if (!session?.user || session.user.role !== 'superadmin') {
    redirect('/')
  }
  
  const clients = await getAllClients()
  
  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Client Management
          </h1>
          <p className="text-gray-600">
            Manage all clients and their configurations
          </p>
        </div>
        <button className="btn-primary">
          + Add Client
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map(client => (
          <div key={client.id} className="card hover:shadow-md transition-shadow">
            {client.metadata.logo && (
              <img
                src={`${client.metadata.logo.imgix_url}?w=400&h=200&fit=crop&auto=format,compress`}
                alt={client.metadata.client_name}
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
            )}
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {client.metadata.client_name}
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              {client.metadata.contact_email}
            </p>
            {client.metadata.contact_phone && (
              <p className="text-sm text-gray-600 mb-4">
                {client.metadata.contact_phone}
              </p>
            )}
            <div className="flex items-center gap-2 mb-4">
              <span className={`badge ${
                client.metadata.status.key === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {client.metadata.status.value}
              </span>
            </div>
            <div className="text-sm text-gray-600 mb-4">
              <strong>Active Modules:</strong> {client.metadata.active_modules?.length || 0}
            </div>
            <div className="flex gap-2">
              <button className="btn-secondary text-sm flex-1">
                Edit
              </button>
              <button className="text-sm text-red-600 hover:text-red-700">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {clients.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No clients found</p>
        </div>
      )}
    </div>
  )
}