import { NextResponse } from 'next/server'
import { getAllInvoices } from '@/lib/cosmic'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // Safe access with optional chaining
    const clientId = session.user.role !== 'superadmin' ? session.user.clientId : undefined
    const invoices = await getAllInvoices(clientId)
    
    return NextResponse.json(invoices)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch invoices' }, { status: 500 })
  }
}