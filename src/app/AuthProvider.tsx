"use client"
import { SessionProvider, type SessionProviderProps } from 'next-auth/react'

export default function AuthProvider({ children }: SessionProviderProps) {
    return (<SessionProvider>{children}</SessionProvider>)
}
