import { NextAuthOptions } from 'next-auth'
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

        return {
          id: user.id,
          email: user.metadata.email,
          name: user.metadata.full_name,
          role: user.metadata.role.key,
          clientId: user.metadata.client?.id,
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.clientId = user.clientId
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.clientId = token.clientId as string
      }
      return session
    }
  },
}