import { getAllUsers, getAllClients } from '@/lib/cosmic'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function UsersPage() {
  try {
    const session = await getServerSession(authOptions)
    
    // Only superadmins and admins can view users
    if (!session?.user || session.user.role === 'user') {
      redirect('/')
    }
    
    const clientId = session.user.role !== 'superadmin' ? session.user.clientId : undefined
    const [users, clients] = await Promise.all([
      getAllUsers(clientId),
      getAllClients(),
    ])
    
    return (
      <div className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              User Management
            </h1>
            <p className="text-gray-600">
              Manage users and access control
            </p>
          </div>
          <button className="btn-primary">
            + Add User
          </button>
        </div>
        
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
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
                {users.map(user => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          {user.metadata.avatar ? (
                            <img
                              className="h-10 w-10 rounded-full"
                              src={`${user.metadata.avatar.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                              alt={user.metadata.full_name}
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center">
                              {user.metadata.full_name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.metadata.full_name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {user.metadata.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`badge ${
                        user.metadata.role.key === 'superadmin'
                          ? 'bg-purple-100 text-purple-800'
                          : user.metadata.role.key === 'admin'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user.metadata.role.value}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {user.metadata.client?.metadata.client_name || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`badge ${
                        user.metadata.active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {user.metadata.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex gap-2">
                        <button className="text-primary hover:text-blue-700">
                          Edit
                        </button>
                        {session.user.role === 'superadmin' && (
                          <button className="text-red-600 hover:text-red-700">
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {users.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No users found</p>
          </div>
        )}
      </div>
    )
  } catch (error) {
    console.error('Error loading users page:', error)
    return (
      <div className="container py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Error Loading Users</h2>
          <p>There was an error loading the users page. Please check your environment configuration.</p>
        </div>
      </div>
    )
  }
}