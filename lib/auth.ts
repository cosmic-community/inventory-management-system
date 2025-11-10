import { NextAuthOptions, User as NextAuthUser } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getUserByEmail } from '@/lib/cosmic'
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password required')
        }

        const user = await getUserByEmail(credentials.email)
        
        if (!user || !user.metadata.active) {
          throw new Error('Invalid credentials or inactive account')
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.metadata.password_hash
        )

        if (!isPasswordValid) {
          throw new Error('Invalid credentials')
        }

        // Return user object with custom properties
        return {
          id: user.id,
          email: user.metadata.email,
          name: user.metadata.full_name,
          role: user.metadata.role.key,
          clientId: user.metadata.client?.id,
        } as NextAuthUser
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      // When user signs in, add custom properties to token
      if (user) {
        token.id = user.id
        token.role = (user as any).role
        token.clientId = (user as any).clientId
      }
      return token
    },
    async session({ session, token }) {
      // Add custom properties from token to session
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.clientId = token.clientId as string | undefined
      }
      return session
    }
  },
}