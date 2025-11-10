import { UserRole, Permission } from '@/types'

// Define permissions for each role
const rolePermissions: Record<UserRole, Record<string, Permission>> = {
  superadmin: {
    clients: { module: 'clients', canView: true, canCreate: true, canEdit: true, canDelete: true },
    users: { module: 'users', canView: true, canCreate: true, canEdit: true, canDelete: true },
    products: { module: 'products', canView: true, canCreate: true, canEdit: true, canDelete: true },
    categories: { module: 'categories', canView: true, canCreate: true, canEdit: true, canDelete: true },
    locations: { module: 'locations', canView: true, canCreate: true, canEdit: true, canDelete: true },
    invoices: { module: 'invoices', canView: true, canCreate: true, canEdit: true, canDelete: true },
    quotations: { module: 'quotations', canView: true, canCreate: true, canEdit: true, canDelete: true },
  },
  admin: {
    clients: { module: 'clients', canView: false, canCreate: false, canEdit: false, canDelete: false },
    users: { module: 'users', canView: true, canCreate: true, canEdit: true, canDelete: false },
    products: { module: 'products', canView: true, canCreate: true, canEdit: true, canDelete: true },
    categories: { module: 'categories', canView: true, canCreate: true, canEdit: true, canDelete: true },
    locations: { module: 'locations', canView: true, canCreate: true, canEdit: true, canDelete: true },
    invoices: { module: 'invoices', canView: true, canCreate: true, canEdit: true, canDelete: true },
    quotations: { module: 'quotations', canView: true, canCreate: true, canEdit: true, canDelete: true },
  },
  user: {
    clients: { module: 'clients', canView: false, canCreate: false, canEdit: false, canDelete: false },
    users: { module: 'users', canView: false, canCreate: false, canEdit: false, canDelete: false },
    products: { module: 'products', canView: true, canCreate: false, canEdit: false, canDelete: false },
    categories: { module: 'categories', canView: true, canCreate: false, canEdit: false, canDelete: false },
    locations: { module: 'locations', canView: true, canCreate: false, canEdit: false, canDelete: false },
    invoices: { module: 'invoices', canView: true, canCreate: false, canEdit: false, canDelete: false },
    quotations: { module: 'quotations', canView: true, canCreate: false, canEdit: false, canDelete: false },
  },
}

export function getPermissions(role: UserRole): Permission[] {
  return Object.values(rolePermissions[role] || {})
}

export function hasPermission(
  role: UserRole,
  module: string,
  action: 'view' | 'create' | 'edit' | 'delete'
): boolean {
  const permissions = rolePermissions[role]
  if (!permissions || !permissions[module]) {
    return false
  }

  const permission = permissions[module]
  switch (action) {
    case 'view':
      return permission.canView
    case 'create':
      return permission.canCreate
    case 'edit':
      return permission.canEdit
    case 'delete':
      return permission.canDelete
    default:
      return false
  }
}

export function canAccessClient(role: UserRole, userClientId?: string, targetClientId?: string): boolean {
  // Superadmins can access all clients
  if (role === 'superadmin') {
    return true
  }

  // Other roles can only access their own client
  return userClientId === targetClientId
}