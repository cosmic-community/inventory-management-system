import { NextResponse } from 'next/server'
import { getAllQuotations } from '@/lib/cosmic'
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
    const quotations = await getAllQuotations(clientId)
    
    return NextResponse.json(quotations)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch quotations' }, { status: 500 })
  }
}